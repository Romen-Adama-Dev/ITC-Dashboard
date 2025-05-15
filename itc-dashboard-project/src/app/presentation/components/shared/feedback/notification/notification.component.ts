import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzNotificationComponent } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzTagModule, NzNotificationModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class UnifiedNotificationDemoComponent {
  /**
   * Template reference typed according to NzNotificationService requirements.
   * The context includes $implicit (component instance) and data (payload).
   */
  @ViewChild('templateRef', { static: false })
  templateRef?: TemplateRef<{ $implicit: NzNotificationComponent; data: any }>;

  constructor(private notification: NzNotificationService) {}

  /**
   * Creates a standard notification of given type (success, info, warning, error).
   */
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }

  /**
   * Displays a custom notification using the provided template.
   */
  createCustomIconNotification(
    template: TemplateRef<{ $implicit: NzNotificationComponent; data: any }>
  ): void {
    this.notification.template(template, { nzData: {} });
  }

  /**
   * Displays a styled blank notification using custom CSS and dimensions.
   */
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

  /**
   * Iterates through a set of data objects and displays template notifications with context.
   */
  createTemplateNotification(): void {
    const fruits = [
      { name: 'Apple', color: 'red' },
      { name: 'Orange', color: 'orange' },
      { name: 'Watermelon', color: 'green' }
    ];
    if (this.templateRef) {
      fruits.forEach(fruit => {
        this.notification.template(this.templateRef!, { nzData: fruit });
      });
    }
  }
}
