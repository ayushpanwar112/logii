import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-tab-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="new-tab-wrapper d-flex h-100 w-100 flex-column align-items-center justify-content-center text-center p-4">
    <div class="icon-circle mb-3"><i class="bi bi-gear-fill"></i></div>
    <h6 class="fw-semibold mb-2">The new form will load here</h6>
    <p class="text-muted small mb-3">Select a module from the sidebar to get started. Manage your operations efficiently.</p>
    <div class="hint rounded px-3 py-2 small">Tip: Open multiple tabs with the (+) button and switch between them without losing data.</div>
  </div>
  `,
  styles: [`
    :host { display:block; height:100%; }
    .icon-circle { width:60px; height:60px; background:#fff3cd; color:#d48806; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.6rem; }
    .hint { background:#f1f5f9; }
  `]
})
export class NewTabPlaceholder {}