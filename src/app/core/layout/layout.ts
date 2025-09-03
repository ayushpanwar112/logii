import { Component } from '@angular/core';

import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { TabBar } from "./tab-bar/tab-bar";
import { Setting } from "./setting/setting";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Navbar, Sidebar, TabBar, Setting],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

  constructor() { }

 showSettingSidebar:boolean= false;

  toggleSettingSidebar() {
    this.showSettingSidebar = !this.showSettingSidebar;
  }


   currentTheme = 'pink'; // default theme

  ngOnInit() {
    this.currentTheme = localStorage.getItem('app-theme') || 'pink';
    this.applyTheme();
  }

  setColor(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('app-theme', theme);
    this.applyTheme();
  }

  applyTheme() {
    const themes = ['dark', 'light', 'pink', 'orange', 'green', 'gray', 'blue'];
    const body = document.body;

    // Remove old theme
    themes.forEach(t => body.classList.remove(`${t}-theme`));

    // Add new theme class
    body.classList.add(`${this.currentTheme}-theme`);
  }


}
