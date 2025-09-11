import { Injectable, Type, signal, computed } from '@angular/core';

export interface TabDescriptor {
  id: string;              // unique id
  title: string;           // tab label
  component: Type<any>;    // component class to instantiate
  icon?: string;           // optional icon class
  closable: boolean;       // can close
  active: boolean;         // currently active
  state?: any;             // arbitrary per-tab state bucket
}

@Injectable({ providedIn: 'root' })
export class TabService {
  private tabsSignal = signal<TabDescriptor[]>([]);

  tabs = computed(() => this.tabsSignal());
  activeTab = computed(() => this.tabsSignal().find(t => t.active));

  openOrActivate(title: string, component: Type<any>, opts?: { icon?: string; singleton?: boolean; stateFactory?: () => any; }): void {
    this.tabsSignal.update(list => {
      if (opts?.singleton) {
        const existing = list.find(t => t.title === title && t.component === component);
        if (existing) {
          return list.map(t => ({ ...t, active: t === existing }));
        }
      }
      // create new tab
      const id = crypto.randomUUID();
      const tab: TabDescriptor = {
        id,
        title,
        component,
        icon: opts?.icon,
        closable: true,
        active: true,
        state: opts?.stateFactory ? opts.stateFactory() : {}
      };
      return list.map(t => ({ ...t, active: false })).concat(tab);
    });
  }

  // Replace the currently active tab's component instead of adding a new tab.
  // If no active tab exists, falls back to opening a new one.
  replaceActive(title: string, component: Type<any>, opts?: { icon?: string; stateFactory?: () => any; }): void {
    this.tabsSignal.update(list => {
      const idx = list.findIndex(t => t.active);
      if (idx === -1) {
        // No active tab: open new
        const id = crypto.randomUUID();
        const tab: TabDescriptor = {
          id,
          title,
          component,
          icon: opts?.icon,
          closable: true,
          active: true,
          state: opts?.stateFactory ? opts.stateFactory() : {}
        };
        return list.map(t => ({ ...t, active: false })).concat(tab);
      }
      // Replace in place, keep same id and position
      const current = list[idx];
      const replaced: TabDescriptor = {
        ...current,
        title,
        component,
        icon: opts?.icon ?? current.icon,
        state: opts?.stateFactory ? opts.stateFactory() : {}
      };
      const newList = [...list];
      newList[idx] = replaced;
      return newList;
    });
  }

  activate(id: string): void {
    this.tabsSignal.update(list => list.map(t => ({ ...t, active: t.id === id })));
  }

  close(id: string): void {
    this.tabsSignal.update(list => {
      const idx = list.findIndex(t => t.id === id);
      if (idx === -1) return list;
      const wasActive = list[idx].active;
      const newList = list.filter(t => t.id !== id);
      if (wasActive && newList.length) {
        // activate neighbor (prefer previous)
        const newIdx = Math.max(0, idx - 1);
        newList[newIdx] = { ...newList[newIdx], active: true };
      }
      return newList;
    });
  }

  closeOthers(id: string): void {
    this.tabsSignal.update(list => list.filter(t => t.id === id).map(t => ({ ...t, active: true })));
  }

  closeAll(): void {
    this.tabsSignal.set([]);
  }

  getUniqueTitle(base: string): string {
    const titles = this.tabsSignal().map(t => t.title);
    if (!titles.includes(base)) return base;
    let i = 2;
    while (titles.includes(`${base} ${i}`)) i++;
    return `${base} ${i}`;
  }
}
