import { Component } from '@angular/core';

import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { TabBar } from "./tab-bar/tab-bar";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Navbar, Sidebar, TabBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
