import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-float-menu-button',
  standalone: true,
  imports: [NzFloatButtonModule, NzDropDownModule, NzIconModule, CommonModule],
  templateUrl: './float-menu-button.component.html',
  styleUrls: ['./float-menu-button.component.scss']
})
export class FloatMenuButtonComponent {
  @Input() nzShape: 'circle' | 'square' = 'circle';
  @Input() nzType: 'primary' | 'default' = 'primary';
  @Input() right: string = '54px';
  @Input() trigger: 'click' | 'hover' = 'click';

  
  @Input() primaryIcon: string = 'customer-service';
  @Input() primaryIconTheme: 'outline' | 'fill' | 'twotone' = 'outline';
  @Input() primaryDescription: string | TemplateRef<any> = '';
  @Input() primaryHref: string = '';
  @Input() primaryTarget: string = '';
  @Output() nzOnClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Input() secondaryIcon: string = 'comment';
  @Input() secondaryIconTheme: 'outline' | 'fill' | 'twotone' = 'outline';
  @Input() secondaryDescription: string | TemplateRef<any> = '';
  @Input() secondaryHref: string = '';
  @Input() secondaryTarget: string = '';

  onOpenChange(status: boolean): void {
    console.log('Estado del grupo de float buttons:', status);
  }

  handlePrimaryClick(): void {
    this.nzOnClick.emit(true);
  }

  handleSecondaryClick(): void {
    this.nzOnClick.emit(true);
  }
}