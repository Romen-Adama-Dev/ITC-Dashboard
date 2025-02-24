// modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  exportAs: 'addModal',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NzDemoModalAsyncComponent {
  @Input() label: string = 'Show Modal';
  @Input() nzVisible: boolean = false;
  @Input() isOkLoading: boolean = false;

  @Input() nzTitle: string | TemplateRef<any> = 'Modal Title';
  @Input() nzWidth: string | number = 520;
  @Input() nzBodyStyle: { [key: string]: any } = {};
  @Input() nzStyle: { [key: string]: any } = {};
  @Input() nzClassName: string = '';
  @Input() nzWrapClassName: string = '';
  @Input() nzZIndex: number = 1000;
  @Input() nzFooter: string | TemplateRef<any> | null = null;
  @Input() nzOkText: string = 'OK';
  @Input() nzCancelText: string = 'Cancel';
  @Input() nzOkType: 'primary' | 'dashed' | 'default' | 'link' = 'link';
  @Input() nzOkDanger: boolean = false;

  @Input() nzMask: boolean = true;
  @Input() nzMaskClosable: boolean = true;
  @Input() nzClosable: boolean = true;
  @Input() nzKeyboard: boolean = true;
  @Input() nzCloseOnNavigation: boolean = true;
  @Input() nzMaskStyle: { [key: string]: any } = {};
  @Input() nzDraggable: boolean = false;
  @Input() nzAutofocus: 'ok' | 'cancel' | 'auto' | null = 'auto';
  @Input() nzCloseIcon: string | TemplateRef<any> = '';

  @Output() nzAfterOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() nzAfterClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() nzOnCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() nzOnOk: EventEmitter<any> = new EventEmitter<any>();

  showModal(): void {
    this.nzVisible = true;
    this.nzAfterOpen.emit();
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isOkLoading = false;
      this.nzVisible = false;
      this.nzOnOk.emit();
      this.nzAfterClose.emit('ok');
    }, 3000);
  }

  handleCancel(): void {
    this.nzVisible = false;
    this.nzOnCancel.emit();
    this.nzAfterClose.emit('cancel');
  }
}