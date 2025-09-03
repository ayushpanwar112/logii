import { Component, effect, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabService, TabDescriptor } from '../../services/tab.service';
import { NewTabPlaceholder } from './new-tab';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.html',
  styleUrl: './tab-bar.scss'
})
export class TabBar {
  private tabService = inject(TabService);
  tabs = this.tabService.tabs; // signal
  activeTab = this.tabService.activeTab;

  @ViewChild('tabHost', { read: ViewContainerRef, static: true }) tabHost!: ViewContainerRef;

  constructor() {
    // React to tab list changes and ensure active component is visible while preserving others.
    effect(() => {
      const tabs = this.tabs();
      // Strategy: ensure one embedded view per tab, reuse existing if present.
      // We'll tag each view with a tab id in its context.
      tabs.forEach(tab => this.ensureView(tab));
      // Remove views whose tab disappeared.
      for (let i = this.tabHost.length - 1; i >= 0; i--) {
        const viewRef: any = this.tabHost.get(i);
        if (viewRef?.rootNodes?.length) {
          const marker = (viewRef as any)._logiiTabId; // custom property
          if (!tabs.find(t => t.id === marker)) {
            this.tabHost.remove(i);
          }
        }
      }
      // Show/hide via CSS class instead of destroying.
      this.updateVisibility();
    });
  }

  private ensureView(tab: TabDescriptor) {
    // Find existing view by custom property.
    for (let i = 0; i < this.tabHost.length; i++) {
      const viewRef: any = this.tabHost.get(i);
      if (viewRef && viewRef._logiiTabId === tab.id) {
        return; // already exists
      }
    }
    const compRef = this.tabHost.createComponent(tab.component);
    (compRef.hostView as any)._logiiTabId = tab.id;
    // pass state object if component has an 'tabState' input property (optional pattern)
    if ('tabState' in compRef.instance) {
      (compRef.instance as any).tabState = tab.state;
    }
  }

  private updateVisibility() {
    const tabs = this.tabs();
    for (let i = 0; i < this.tabHost.length; i++) {
      const viewRef: any = this.tabHost.get(i);
      const tabId = viewRef?._logiiTabId;
      const tab = tabs.find(t => t.id === tabId);
      if (!tab) continue;
      // root node might be first root node element
      const rootEl = viewRef.rootNodes.find((n: any) => n.nodeType === 1);
      if (rootEl) {
        rootEl.classList.add('tab-pane-host');
        (rootEl as HTMLElement).style.display = tab.active ? '' : 'none';
      }
    }
  }

  activate(tab: TabDescriptor) { this.tabService.activate(tab.id); }
  close(tab: TabDescriptor, ev: MouseEvent) { ev.stopPropagation(); this.tabService.close(tab.id); }
  closeOthers(tab: TabDescriptor, ev: MouseEvent) { ev.stopPropagation(); this.tabService.closeOthers(tab.id); }
  closeAll(ev: MouseEvent) { ev.stopPropagation(); this.tabService.closeAll(); }
  openNewTab(ev: MouseEvent) {
    ev.stopPropagation();
    const title = this.tabService.getUniqueTitle('NewTab');
    this.tabService.openOrActivate(title, NewTabPlaceholder, { icon: 'bi bi-plus-square', singleton: false });
  }
}
