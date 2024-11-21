import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, inject, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[ChatNotificationOutside]',
  standalone: true
})
export class ChatNotificationDirective implements AfterViewInit, OnDestroy {

  @Output() clickOutside = new EventEmitter<void>();

  private documentClickSubscription!: Subscription;
  private element = inject(ElementRef);

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      ).subscribe(() => {
        this.clickOutside.emit();
      })
  }

  ngOnDestroy(): void {
    this.documentClickSubscription.unsubscribe();
  }

  private isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }

}
