import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzButtonModule],
  templateUrl: './drop-button.component.html',
  styleUrls: ['./drop-button.component.scss']
})
export class LanguageDropdownComponent {
  @Input() languages: Array<{ code: string; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh', label: '中文' }
  ];

  @Input() selectedLanguage: string = 'en';

  @Input() nzSize: 'small' | 'default' | 'large' = 'default';
  @Input() nzLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() nzDanger: boolean = false;

  @Output() languageChange = new EventEmitter<string>();

  get selectedLabel(): string {
    return this.languages.find(l => l.code === this.selectedLanguage)?.label || '';
  }

  changeLanguage(language: { code: string; label: string }): void {
    this.languageChange.emit(language.code);
  }
}