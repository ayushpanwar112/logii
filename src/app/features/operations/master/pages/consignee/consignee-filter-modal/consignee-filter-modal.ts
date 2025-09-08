import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-consignee-filter-modal',
  standalone: true,
  imports: [],
  templateUrl: './consignee-filter-modal.html',
  styleUrl: './consignee-filter-modal.scss'
})
export class ConsigneeFilterModal {

  @Input() columns: { key: string; label: string; }[] = [];
  @Input() active: Set<string> = new Set();
  @Output() toggleFilter = new EventEmitter<void>();
  @Output() applyColumns = new EventEmitter<string[]>();

  tempSelection: Set<string> = new Set();

  ngOnInit(): void {
    this.tempSelection = new Set(this.active);
  }

  isChecked(key: string): boolean { return this.tempSelection.has(key); }
  toggleColumn(key: string) {
    if (this.tempSelection.has(key)) this.tempSelection.delete(key); else this.tempSelection.add(key);
  }

  reset() { this.tempSelection = new Set(this.active); }

  apply() {
    const next = Array.from(this.tempSelection);
    const current = Array.from(this.active);
    const changed = next.length !== current.length || next.some(k => !this.active.has(k));
    // Debug log to help diagnose why Apply might feel unresponsive
    console.log('[ConsigneeFilterModal] Apply clicked. Changed?', changed, 'Next:', next);
    if (changed) {
      this.applyColumns.emit(next);
    } else {
      // Still close even if nothing changed to reflect user's intent
      this.closefilter();
    }
  }

  closefilter(){ this.toggleFilter.emit(); }
}
