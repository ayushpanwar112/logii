

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabService } from '../../services/tab.service';

import { ConsigneeList } from '../../../features/operations/master/pages/consignee/consignee.list/consignee.list';


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
          name: 'Users & Rights',
          expanded: true,
          subItems: [
            { name: 'Traffic Overview', route: '/analytics/traffic' },
            { name: 'Revenue Reports', route: '/analytics/revenue' },
            { name: 'User Behavior', route: '/analytics/behavior' },
            { name: 'Conversion Metrics', route: '/analytics/conversion' }
          ]
        },
        {
          name: 'Settings',
          expanded: false,
          subItems: [
            { name: 'Live Users', route: '/realtime/users' },
            { name: 'Active Sessions', route: '/realtime/sessions' },
            { name: 'Live Events', route: '/realtime/events' }
          ]
        },
        {
          name: 'Templates',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports', route: '/reports/weekly' },
            { name: 'Monthly Reports', route: '/reports/monthly' },
            { name: 'Custom Reports', route: '/reports/custom' }
          ]
        },
        {
          name: 'Notification Settings',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports', route: '/reports/weekly' },
            { name: 'Monthly Reports', route: '/reports/monthly' },
            { name: 'Custom Reports', route: '/reports/custom' }
          ]
        },
        {
          name: 'Designer',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports', route: '/reports/weekly' },
            { name: 'Monthly Reports', route: '/reports/monthly' },
            { name: 'Custom Reports', route: '/reports/custom' }
          ]
        },
        {
          name: 'Reports',
          expanded: false,
          subItems: [
            { name: 'Weekly Reports', route: '/reports/weekly' },
            { name: 'Monthly Reports', route: '/reports/monthly' },
            { name: 'Custom Reports', route: '/reports/custom' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-people-fill',
      title: 'Operations',
      sections: [
        {
          name: 'Masters',
          expanded: true,
          subItems: [
            { name: 'Consignee', route: '/operations/master/consignee', active: true, enabled: true },
            { name: 'Billing Party', route: '/operations/master/billing-party', enabled: false },
            { name: 'Transporter', route: '/operations/master/transporter', enabled: false },
            { name: 'Vehicle', route: '/operations/master/vehicle', enabled: false },
            { name: 'Vehicle Make', route: '/operations/master/vehicle-make', enabled: false },
            { name: 'Vehicle Model', route: '/operations/master/vehicle-model', enabled: false },
            { name: 'Driver', route: '/operations/master/driver', enabled: false },
            { name: 'Employee', route: '/operations/master/employee', enabled: false },
            { name: 'Content', route: '/operations/master/content', enabled: false },
            { name: 'Load Capacity', route: '/operations/master/load-capacity', enabled: false }
          ]
        },
        {
          name: 'Master Reports',
          expanded: false,
          subItems: [
            { name: 'User Roles', route: '/permissions/roles' },
            { name: 'Access Control', route: '/permissions/access' },
            { name: 'Admin Rights', route: '/permissions/admin' }
          ]
        },
        {
          name: 'Contracts',
          expanded: false,
          subItems: [
            { name: 'Login History', route: '/activity/login' },
            { name: 'Action Logs', route: '/activity/actions' },
            { name: 'Security Events', route: '/activity/security' }
          ]
        },
        {
          name: 'Transportations',
          expanded: false,
          subItems: [
            { name: 'Login History', route: '/activity/login' },
            { name: 'Action Logs', route: '/activity/actions' },
            { name: 'Security Events', route: '/activity/security' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Analytics',
      sections: [
        {
          name: 'Performance',
          expanded: false,
          subItems: [
            { name: 'Page Speed', route: '/performance/speed' },
            { name: 'Load Times', route: '/performance/load' },
            { name: 'Error Rates', route: '/performance/errors' }
          ]
        },
        {
          name: 'SEO Analytics',
          expanded: false,
          subItems: [
            { name: 'Keywords', route: '/seo/keywords' },
            { name: 'Backlinks', route: '/seo/backlinks' },
            { name: 'Rankings', route: '/seo/rankings' }
          ]
        }
      ]
    },
    {
      icon: 'bi bi-gear-fill',
      title: 'Settings',
      sections: [
        {
          name: 'General Settings',
          expanded: false,
          subItems: [
            { name: 'Site Configuration', route: '/settings/site' },
            { name: 'Appearance', route: '/settings/appearance' },
            { name: 'Localization', route: '/settings/locale' }
          ]
        },
        {
          name: 'Security',
          expanded: false,
          subItems: [
            { name: 'Authentication', route: '/security/auth' },
            { name: 'SSL Settings', route: '/security/ssl' },
            { name: 'Backup Settings', route: '/security/backup' }
          ]
        },
        {
          name: 'Integrations',
          expanded: false,
          subItems: [
            { name: 'API Keys', route: '/integrations/api' },
            { name: 'Third-party Services', route: '/integrations/services' },
            { name: 'Webhooks', route: '/integrations/webhooks' }
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
      this.tabService.openOrActivate('Consignee', ConsigneeList, { icon: 'bi bi-person-lines-fill', singleton: true, stateFactory: () => ({}) });
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
