

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabService } from '../../services/tab.service';
import { BookingDashboard } from '../../../features/operations/booking-dashboard/booking-dashboard';
import { AdminDashboard } from '../../../features/admin/admin-dashboard/admin-dashboard';
import { AnalyticsDashboard } from '../../../features/analytics/analytics-dashboard/analytics-dashboard';

import { ConsigneeList } from '../../../features/operations/master/pages/consignee/consignee.list/consignee.list';
import { SettingsDashboard } from '../../../features/settings/settings-dashboard/settings-dashboard';


interface SubItem {
  name: string;
  route?: string;
  active?: boolean;
  enabled?: boolean; // if false, kept for future but not shown yet
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
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {

   showSidebar: boolean = false;
  selectedIndex: number = 0;
  sidebarExpanded: boolean = false;
  animating: boolean = false; // panel animation state

  constructor(private tabService: TabService) { }

  ngOnInit(): void { }

  // Populate sidebarPanels with your panel data below
  sidebarPanels: SidebarPanel[] = [
    {
      icon: 'bi bi-speedometer2',
      title: 'Admin',
      
      sections: [
        {
          name: 'Overview',
          expanded: true,
          subItems: [
            { name: 'Dashboard' }
          ]
        },
        {
          name: 'Users & Rights',
          expanded: false,
          subItems: [
            { name: 'Traffic Overview' },
            { name: 'Revenue Reports' },
            { name: 'User Behavior' },
            { name: 'Conversion Metrics' }
          ]
        },
        {
          name: 'Settings',
          expanded: false,
          subItems: [
            { name: 'Live Users' },
            { name: 'Active Sessions' },
            { name: 'Live Events' }
          ]
        },
        {
          name: 'Templates',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports' },
            { name: 'Monthly Reports' },
            { name: 'Custom Reports' }
          ]
        },
        {
          name: 'Notification Settings',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports' },
            { name: 'Monthly Reports' },
            { name: 'Custom Reports' }
          ]
        },
        {
          name: 'Designer',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports' },
            { name: 'Monthly Reports' },
            { name: 'Custom Reports' }
          ]
        },
        {
          name: 'Reports',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports' },
            { name: 'Monthly Reports' },
            { name: 'Custom Reports' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-people-fill',
      title: 'Operations',
      sections: [
        {
          name: 'Overview',
          expanded: true,
          subItems: [
            { name: 'Dashboard' }
          ]
        },
        {
          name: 'Masters',
          expanded: false,
          subItems: [
            { name: 'Consignee', active: true, enabled: true },
            { name: 'Billing Party', enabled: false },
            { name: 'Transporter', enabled: false },
            { name: 'Vehicle', enabled: false },
            { name: 'Vehicle Make', enabled: false },
            { name: 'Vehicle Model', enabled: false },
            { name: 'Driver', enabled: false },
            { name: 'Employee', enabled: false },
            { name: 'Content', enabled: false },
            { name: 'Load Capacity', enabled: false }
          ]
        },
        {
          name: 'Master Reports',
          expanded: false,
          subItems: [
            { name: 'User Roles' },
            { name: 'Access Control' },
            { name: 'Admin Rights' }
          ]
        },
        {
          name: 'Contracts',
          expanded: false,
          subItems: [
            { name: 'Login History' },
            { name: 'Action Logs' },
            { name: 'Security Events' }
          ]
        },
        {
          name: 'Transportations',
          expanded: false,
          subItems: [
            { name: 'Login History' },
            { name: 'Action Logs' },
            { name: 'Security Events' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Analytics',
      sections: [
        {
          name: 'Overview',
          expanded: true,
          subItems: [
            { name: 'Dashboard' }
          ]
        },
        {
          name: 'Performance',
          expanded: false,
          subItems: [
            { name: 'Page Speed' },
            { name: 'Load Times' },
            { name: 'Error Rates' }
          ]
        },
        {
          name: 'SEO Analytics',
          expanded: false,
          subItems: [
            { name: 'Keywords' },
            { name: 'Backlinks' },
            { name: 'Rankings' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-gear-fill',
      title: 'Settings',
      sections: [
         {
          name: 'Overview',
          expanded: true,
          subItems: [
            { name: 'Dashboard' }
          ]
        },
        {
          name: 'General Settings',
          expanded: false,
          subItems: [
            { name: 'Site Configuration' },
            { name: 'Appearance' },
            { name: 'Localization' }
          ]
        },
        {
          name: 'Security',
          expanded: false,
          subItems: [
            { name: 'Authentication' },
            { name: 'SSL Settings' },
            { name: 'Backup Settings' }
          ]
        },
        {
          name: 'Integrations',
          expanded: false,
          subItems: [
            { name: 'API Keys' },
            { name: 'Third-party Services' },
            { name: 'Webhooks' }
          ]
        }
      ]
    }
  ];

  toggleSidebar(index: number): void {
    if (this.selectedIndex === index && this.showSidebar) {
      this.startCloseAnimation();
      return;
    }
    this.selectedIndex = index;
    this.showSidebar = true;
    this.animating = true;
  }

  closeSidebar(): void {
    this.startCloseAnimation();
  }

  toggleSection(section: SidebarSection): void {
    if (section.subItems && section.subItems.length > 0) {
      section.expanded = !section.expanded;
    }
  }

  selectSubItem(subItem: SubItem): void {
    // Mark active in menu
    this.sidebarPanels.forEach(panel => panel.sections.forEach(section => section.subItems?.forEach(i => i.active = false)));
    subItem.active = true;
    // Open / activate tab (currently only Consignee implemented)
    if (subItem.name === 'Consignee') {
      this.tabService.replaceActive('Consignee', ConsigneeList, { icon: 'bi bi-person-lines-fill', stateFactory: () => ({}) });
      return;
    }
    if (subItem.name === 'Dashboard') {
      const currentPanel = this.sidebarPanels[this.selectedIndex];
      switch (currentPanel.title) {
        case 'Admin':
          this.tabService.replaceActive('Admin Dashboard', AdminDashboard, { icon: 'bi bi-speedometer2' });
          break;
        case 'Operations':
          this.tabService.replaceActive('Operations Dashboard', BookingDashboard, { icon: 'bi bi-speedometer2' });
          break;
        case 'Analytics':
          this.tabService.replaceActive('Analytics Dashboard', AnalyticsDashboard, { icon: 'bi bi-speedometer2' });
          break;
        case 'Settings':
          this.tabService.replaceActive('Settings Overview', SettingsDashboard, { icon: 'bi bi-speedometer2' });
          break;
      }
      return;
    }
    // Future: map other names to their components here.
  }

  toggleSidebarExpansion(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  private startCloseAnimation(): void {
    if (!this.showSidebar) return;
    this.animating = true;
    // allow CSS animation class to play before hiding
    // we keep showSidebar true until animationend then flip
    this.showSidebar = false; // template uses negation with class.animating-close
  }

  onPanelAnimationEnd(): void {
    // when closing, panel already hidden logically
    this.animating = false;
  }

}
