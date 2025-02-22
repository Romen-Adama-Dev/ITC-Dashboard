import { Component } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class UnifiedMessageDemoComponent {
  constructor(private message: NzMessageService) {}

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  startShowMessages(): void {
    this.message
      .loading('Action in progress', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Loading finished', { nzDuration: 2500 }).onClose!),
        concatMap(() => this.message.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }
}