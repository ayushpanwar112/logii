import { Component } from '@angular/core';

interface SubItem {
  name: string;
  route?: string;
  active?: boolean;
}

interface SidebarSection {
  name: string;
  expanded: boolean;
  subItems?: SubItem[];
}

interface SidebarPanel {
  icon: string;
  title: string;
  sections: SidebarSection[];
}


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

}
