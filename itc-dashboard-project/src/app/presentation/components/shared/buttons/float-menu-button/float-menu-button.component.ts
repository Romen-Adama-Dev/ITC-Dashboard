import { Component } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-float-menu-button',
  standalone: true,
  imports: [NzFloatButtonModule, NzDropDownModule, NzIconModule],
  templateUrl: './float-menu-button.component.html',
  styleUrl: './float-menu-button.component.scss'
})
export class MenuFloatButtonComponent {
  onOpenChange(status: boolean): void {
    console.log('Estado del grupo de float buttons:', status);
  }
}
