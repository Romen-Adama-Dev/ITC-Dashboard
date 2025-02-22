import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-popconfirm-promise',
  standalone: true,
  imports: [NzButtonModule, NzPopconfirmModule],
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss']
})
export class NzDemoPopconfirmPromiseComponent {
  constructor(private nzMessageService: NzMessageService) {}

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }
}