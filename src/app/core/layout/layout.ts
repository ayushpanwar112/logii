import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
