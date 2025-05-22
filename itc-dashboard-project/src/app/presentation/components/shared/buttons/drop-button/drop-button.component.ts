import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [CommonModule, NzDropDownModule, NzIconModule],
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
  @Output() languageChange = new EventEmitter<string>();

  /** Para evitar lambdas en el template */
  get selectedLabel(): string {
    const found = this.languages.find(l => l.code === this.selectedLanguage);
    return found ? found.label : '';
  }

  changeLanguage(lang: { code: string; label: string }): void {
    if (lang.code !== this.selectedLanguage) {
      this.languageChange.emit(lang.code);
    }
  }
}