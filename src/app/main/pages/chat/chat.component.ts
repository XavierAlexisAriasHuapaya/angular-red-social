import { AfterViewChecked, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage, faInfoCircle, faMicrophone, faPaperPlane, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { ChatCreate } from '../../interfaces/chat-create.interfaces';
import { forkJoin } from 'rxjs';
import { MessageCreate } from '../../interfaces/message-create.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ChatTimePipe } from '../../pipes/chat-time.pipe';

@Component({
  selector: 'app-chat',
  imports: [FontAwesomeModule, FormsModule, CommonModule, ChatTimePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  private _messageService = inject(MessageService);
  private _authenticationService = inject(AuthenticationService);
  private _userService = inject(UserService);
  private _chatService = inject(ChatService);
  private _activatedRoute = inject(ActivatedRoute);
  private _chatId!: number;
  private _roomCode!: string;
  private _shouldScrollToBottom: boolean = false;

  public faPhone = faPhone;
  public faVideo = faVideo;
  public faInfo = faInfoCircle;
  public faImage = faImage;
  public faMicrophone = faMicrophone;
  public faPaperPlane = faPaperPlane;
  public messageInput: string = '';
  public userDestinationId: number = 0;
  public user?: User;
  public messageList: any[] = [];

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor() {
    this._messageService.initConnectionSocket();
  }

  ngAfterViewChecked(): void {
    if (this._shouldScrollToBottom) {
      this.scrollToBottom();
      this._shouldScrollToBottom = false;
    }
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this._messageService.destroy();
  }

  private triggerScrollToBottom(): void {
    this._shouldScrollToBottom = true;
  }

  private initializeComponent(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userDestinationId = params['id'];
      this.getUser(this.userDestinationId);
      this.ensureChatExists();
    })
  }

  private getUser(userDestinationId: number) {
    this._userService.getUser(userDestinationId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        this.sweetAlert('error', 'Not found username');
      }
    })
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  private sweetAlert(icon: SweetAlertIcon, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: message
    });
  }

  private ensureChatExists() {
    this._chatService.getChatByUsers(this.userDestinationId).subscribe({
      next: (data) => {
        if (data == null) {
          this.craeteChat();
        } else {
          this._roomCode = data.roomCode;
          this._chatId = data.id;
          this._messageService.joinRoom(this._roomCode);
          this._messageService.getAllMessage(this._chatId, this._authenticationService.currentUserId()).subscribe();
          this._chatService.getChatOneByUser(this._chatId, this._authenticationService.currentUserId()).subscribe();
          this.listenerMessage();
          this.scrollToBottom();
        }
      }
    });
  }

  private craeteChat() {
    const userIdOne = this._authenticationService.currentUserId();
    forkJoin({
      userOne: this._userService.getUser(userIdOne),
      userTwo: this._userService.getUser(this.userDestinationId)
    }).subscribe({
      next: (response) => {
        const userOne = response.userOne;
        const userTwo = response.userTwo;
        const chatCreate: ChatCreate = {
          name: '',
          chatType: '0',
          chatMembers: [
            {
              user: userOne
            }, {
              user: userTwo
            }
          ]
        };
        this._chatService.saveChat(chatCreate).subscribe({
          next: (chat) => {
            this._chatId = chat.data.id;
            this._roomCode = chat.data.roomCode;
            this._messageService.joinRoom(this._roomCode);
            this.listenerMessage();
          },
          error: (err) => {
            this.sweetAlert('error', 'Error when trying to create the chat');
          }
        });
      }
    })
  }

  private sendCreateMessage() {
    if (this._chatId == 0 || this._chatId == undefined) {
      this.sweetAlert('warning', 'Error getting chat data');
      return;
    }
    if (this.messageInput == '') {
      this.sweetAlert('warning', 'Empty message');
      return;
    }
    const messageCreate: MessageCreate = {
      chat: {
        id: this._chatId,
        roomCode: this._roomCode
      },
      user: {
        id: this._authenticationService.currentUserId()
      },
      content: this.messageInput
    };
    this._messageService.sendMessage(this._roomCode, messageCreate);
    this.messageInput = '';
    this.triggerScrollToBottom();
    this._chatService.getChatOneByUserAll(messageCreate.chat.id, messageCreate.user.id).subscribe(data => {
      let userIdReceiver = 0;
      data.chat.chatMembers.forEach(data => {
        if (data.user.id != messageCreate.user.id) {
          userIdReceiver = data.user.id;
        }
      })
      this._chatService.sendMessage(userIdReceiver);
    })
  }

  public sendMessage() {
    this.sendCreateMessage();
  }

  public listenerMessage() {
    this._messageService.getMessageSubject().subscribe((messages: any[]) => {
      const filteredMessages = messages.filter(
        (message) => message.chat.roomCode === this._roomCode
      );
      this.messageList = filteredMessages.map((item: any) => {
        if (item) {
          const createdAt = item.createdAt ? item.createdAt : Date.now();
          return ({
            ...item,
            createdAt: createdAt,
            messageSide: item.user.id === this._authenticationService.currentUserId() ? 'sender' : 'receiver',
          })
        }
      }
      );
      this.triggerScrollToBottom();
    });
  }
}
