import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage, faInfoCircle, faMicrophone, faPaperPlane, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  faPhone = faPhone;
  faVideo = faVideo;
  faInfo = faInfoCircle;
  faImage = faImage;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
}
