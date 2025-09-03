import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.scss'
})
export class Setting {

  // Current theme provided by parent (Layout)
  @Input() currentTheme: string = 'pink';
  // Emit close event
  @Output() closeSetting = new EventEmitter<void>();
  // Emit theme change to parent so body class logic centralized there
  @Output() themeChange = new EventEmitter<string>();

  // Preference items list
  prefItems: string[] = ['🔒 Account Privacy','🌐 Language','🔔 Notifications'];

  constructor() { }

  closeSidebar() {
    this.closeSetting.emit();
  }

  setColor(theme: string) {
    this.themeChange.emit(theme);
  }
}
