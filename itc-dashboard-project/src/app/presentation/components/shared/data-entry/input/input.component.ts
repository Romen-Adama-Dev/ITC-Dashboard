import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.html']
})
export class appInputComponent {
  searchText: string = '';
}