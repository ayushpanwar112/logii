import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {


  historyCards = [
    { label: 'Total Sales', value: 1000 },
    { label: 'Total Purchase', value: 300 },
    { label: 'Total Income', value: 5 },
    { label: 'Total Expensive', value: 8 }
  ];

  topProducts = [
    { name: 'Bank Balance', sales: 0 },
    { name: 'Cash Balance', sales: 0 },
    { name: 'Cash Deposited', sales: 0 },
    { name: 'WithDrawal', sales: 0 },
  ];

  outstanding = [
    { name: 'Current Receivable', sales: 0 },
    { name: 'Overdue Receivable', sales: 0 },
    { name: 'Current Payable', sales: 0 },
    { name: 'Over Payable', sales: 0 },
  ];

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  visitorChartLabels = this.months;
  visitorChartData = [
    { data: [320, 300, 360, 390, 420, 400, 300], label: 'Loyal Customers' },
    { data: [300, 280, 310, 330, 380, 410, 290], label: 'New Customers' },
    { data: [280, 260, 290, 310, 360, 390, 270], label: 'Unique Customers' }
  ];

  revenueData = [
    { data: [15000, 18000, 22000, 14000, 13000, 16000, 19000], label: 'Online Sales' },
    { data: [9000, 7000, 11000, 8000, 9000, 10000, 12000], label: 'Offline Sales' }
  ];

  netPurchaseData = [
    { data: [2900, 2800, 3100, 3000, 2950, 3200, 3300], label: 'Last Month' },
    { data: [4200, 4300, 4500, 4400, 4300, 4600, 4800], label: 'This Month' }
  ];

  flowChartData = [
    { data: [6000, 7000, 8000, 8500, 8700, 8800, 8900], label: 'Reality Sales' },
    { data: [10000, 11000, 11500, 11800, 12000, 12100, 12200], label: 'Target Sales' }
  ];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  chartColors = [
    { backgroundColor: '#8e44ad', borderColor: '#8e44ad' },
    { backgroundColor: '#3498db', borderColor: '#3498db' },
    { backgroundColor: '#2ecc71', borderColor: '#2ecc71' }
  ];

}
