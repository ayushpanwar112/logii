

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


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
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {

   showSidebar: boolean = false;
  selectedIndex: number = 0;
  sidebarExpanded: boolean = false;

  constructor() { }

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
          expanded: false,
          subItems: [
            { name: 'Consignee', route: '/consignee' },
            { name: 'Billing Party', route: '/billingparty' },
            { name: 'Transporter', route: '/users/inactive' },
            { name: 'Vehicle', route: '/users/groups' },
            { name: 'Vehicle Make', route: '/users/groups' },
            { name: 'Vehicle Model', route: '/users/groups' },
            { name: 'Driver', route: '/users/groups' },
            { name: 'Employee', route: '/users/groups' },
            { name: 'Content', route: '/users/groups' },
            { name: 'Load Capacity', route: '/users/groups' }
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
      this.showSidebar = false;
    } else {
      this.selectedIndex = index;
      this.showSidebar = true;
    }
  }

  closeSidebar(): void {
    this.showSidebar = false;
  }

  toggleSection(section: SidebarSection): void {
    if (section.subItems && section.subItems.length > 0) {
      section.expanded = !section.expanded;
    }
  }

  selectSubItem(subItem: SubItem): void {
    // Clear active states on all sub-items
    this.sidebarPanels.forEach(panel => {
      panel.sections.forEach(section => {
        section.subItems?.forEach(item => {
          if (typeof item === 'object') {
            item.active = false;
          }
        });
      });
    });

    if (subItem && subItem.name) {
      subItem.active = true;
      if (subItem.route) {
        // Update the currently active tab's title and route via TabService
       /*  this.tabService.updateActiveTabRoute(subItem.route, subItem.name); */
      }
    }
  }

  toggleSidebarExpansion(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

}
