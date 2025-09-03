import { Component, EventEmitter, Output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface definitions for type safety
interface User {
  name: string;
  email: string;
  role: string;
  department: string;
}

interface OrganizationData {
  financialYear: string;
  address: string;
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {

  @Output() toggleSettings = new EventEmitter<void>();

  // Using Angular signals for better reactivity (Angular 17+ feature)
  private showProfileModalState = signal(false);
  private switching = signal(false);
  private loggingOut = signal(false);
  private loading = signal(false);

  // Mock current user and organization data with proper typing
  currentUser: User = {
    name: 'Ayush Panwar',
    email: 'ayush@example.com',
    role: 'Admin',
    department: 'IT Department'
  };

  organizationData: OrganizationData = {
    financialYear: '2025-2026',
    address: 'Rajivnagar 248140'
  };

  private keydownListener?: (event: KeyboardEvent) => void;

  ngOnInit(): void {
    // Listen for Escape key to close modal
    this.keydownListener = (event: KeyboardEvent) => {
      if (this.showProfileModalState() && event.key === 'Escape') {
        this.closeProfileModal();
      }
    };
    document.addEventListener('keydown', this.keydownListener);
  }

  ngOnDestroy(): void {
    // Clean up event listener
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
    }
  }

  // Greeting based on current time
  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    else if (hour < 18) return 'Good afternoon';
    else return 'Good evening';
  }

  // Profile modal controls
  toggleProfileModal(): void {
    this.showProfileModalState.set(!this.showProfileModalState());
  }

  showProfileModal(): boolean {
    return this.showProfileModalState();
  }

  closeProfileModal(): void {
    this.showProfileModalState.set(false);
  }

  closeModalOnBackdrop(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeProfileModal();
    }
  }

  // Settings sidebar toggle
  onSettingsClick(): void {
    this.toggleSettings.emit();
  }

  // Simulate switch account action
  switchAccount(): void {
    this.switching.set(true);
    setTimeout(() => {
      this.switching.set(false);
      alert('Switched account!');
    }, 1500);
  }

  isSwitching(): boolean {
    return this.switching();
  }

  // Simulate logout
  confirmLogout(): void {
    this.loggingOut.set(true);
    setTimeout(() => {
      this.loggingOut.set(false);
      alert('Logged out successfully!');
    }, 1500);
  }

  isLoggingOut(): boolean {
    return this.loggingOut();
  }

  // Open tools
  openCalculator(): void {
    alert('Calculator opened.');
  }

  openHelp(): void {
    alert('Help section opened.');
  }

  showShortcuts(): void {
    alert('Keyboard shortcuts shown.');
  }

  openAnalytics(): void {
    alert('Analytics dashboard opened.');
  }

  isLoading(): boolean {
    return this.loading();
  }

}
