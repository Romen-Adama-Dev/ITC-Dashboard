import { Component, TemplateRef, ViewChild } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzTagModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class UnifiedNotificationDemoComponent {
  // Para template notification (fruits)
  @ViewChild('templateRef', { static: false }) templateRef?: TemplateRef<{}>;

  constructor(private notification: NzNotificationService) {}

  // Notificación básica con icono
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      `This is the content of the notification. This is the content of the notification. This is the content of the notification.`
    );
  }

  createCustomIconNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  createCustomStyleNotification(): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px'
        },
        nzClass: 'test-class'
      }
    );
  }

  createTemplateNotification(): void {
    const fruits = [
      { name: 'Apple', color: 'red' },
      { name: 'Orange', color: 'orange' },
      { name: 'Watermelon', color: 'green' }
    ];
    fruits.forEach(fruit => {
      this.notification.template(this.templateRef!, { nzData: fruit });
    });
  }
}