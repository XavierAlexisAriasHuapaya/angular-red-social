import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNotificationLayoutComponent } from './chat-notification-layout.component';

describe('ChatNotificationLayoutComponent', () => {
  let component: ChatNotificationLayoutComponent;
  let fixture: ComponentFixture<ChatNotificationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatNotificationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatNotificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
