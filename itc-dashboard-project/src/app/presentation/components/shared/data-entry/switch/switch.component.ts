import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [FormsModule, NzSwitchModule, NzIconModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchDemoComponent {
  // Para la sección con textos e iconos
  switch1: boolean = true;
  switch2: boolean = false;
  switch3: boolean = true;

  // Para la sección de loading
  switch4: boolean = true;
  switch5: boolean = false;
}