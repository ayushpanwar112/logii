import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-dashboard.html',
  styleUrl: './booking-dashboard.scss'
})
export class BookingDashboard {
  // Dummy booking list
  bookings: BookingRow[] = [
    {
      tripNo: 'TRP-1001', date: new Date('2025-09-01'), vehicle: 'MH12 AB 1234',
      source: 'Pune', destination: 'Mumbai', eta: new Date('2025-09-01T18:30:00'),
      arrivalDate: new Date('2025-09-01T19:00:00'), delayMins: 30, payment: 12000
    },
    {
      tripNo: 'TRP-1002', date: new Date('2025-09-02'), vehicle: 'GJ05 CD 5678',
      source: 'Surat', destination: 'Ahmedabad', eta: new Date('2025-09-02T12:00:00'),
      arrivalDate: new Date('2025-09-02T11:45:00'), delayMins: -15, payment: 8500
    },
    {
      tripNo: 'TRP-1003', date: new Date('2025-09-03'), vehicle: 'DL01 EF 9012',
      source: 'Delhi', destination: 'Jaipur', eta: new Date('2025-09-03T16:00:00'),
      arrivalDate: new Date('2025-09-03T16:10:00'), delayMins: 10, payment: 9800
    },
    {
      tripNo: 'TRP-1004', date: new Date('2025-09-04'), vehicle: 'KA03 GH 3456',
      source: 'Bengaluru', destination: 'Mysuru', eta: new Date('2025-09-04T10:30:00'),
      arrivalDate: new Date('2025-09-04T10:20:00'), delayMins: -10, payment: 7600
    },
    {
      tripNo: 'TRP-1005', date: new Date('2025-09-05'), vehicle: 'TN09 IJ 7890',
      source: 'Chennai', destination: 'Vellore', eta: new Date('2025-09-05T14:00:00'),
      arrivalDate: new Date('2025-09-05T14:45:00'), delayMins: 45, payment: 6400
    },
    {
      tripNo: 'TRP-1006', date: new Date('2025-09-06'), vehicle: 'RJ14 KL 1122',
      source: 'Jaipur', destination: 'Udaipur', eta: new Date('2025-09-06T17:30:00'),
      arrivalDate: new Date('2025-09-06T17:20:00'), delayMins: -10, payment: 9100
    },
    {
      tripNo: 'TRP-1007', date: new Date('2025-09-07'), vehicle: 'PY01 MN 3344',
      source: 'Pondicherry', destination: 'Chennai', eta: new Date('2025-09-07T09:00:00'),
      arrivalDate: new Date('2025-09-07T09:05:00'), delayMins: 5, payment: 5400
    },
    {
      tripNo: 'TRP-1008', date: new Date('2025-09-08'), vehicle: 'UP16 OP 5566',
      source: 'Noida', destination: 'Agra', eta: new Date('2025-09-08T13:15:00'),
      arrivalDate: new Date('2025-09-08T13:50:00'), delayMins: 35, payment: 7000
    },
    {
      tripNo: 'TRP-1009', date: new Date('2025-09-09'), vehicle: 'WB02 QR 7788',
      source: 'Kolkata', destination: 'Durgapur', eta: new Date('2025-09-09T15:30:00'),
      arrivalDate: new Date('2025-09-09T15:15:00'), delayMins: -15, payment: 6200
    },
    {
      tripNo: 'TRP-1010', date: new Date('2025-09-10'), vehicle: 'MP09 ST 9900',
      source: 'Indore', destination: 'Bhopal', eta: new Date('2025-09-10T11:45:00'),
      arrivalDate: new Date('2025-09-10T12:05:00'), delayMins: 20, payment: 6800
    }
  ];

  // row action menu state (stores tripNo of the open menu)
  menuOpenFor: string | null = null;

  toggleMenu(row: BookingRow, ev: MouseEvent) {
    ev.stopPropagation();
    this.menuOpenFor = this.menuOpenFor === row.tripNo ? null : row.tripNo;
  }

  @HostListener('document:click')
  closeMenus() {
    this.menuOpenFor = null;
  }

  view(row: BookingRow) {
    console.log('View booking', row);
  }

  edit(row: BookingRow) {
    console.log('Edit booking', row);
  }
}

export interface BookingRow {
  tripNo: string;
  date: Date;
  vehicle: string;
  source: string;
  destination: string;
  eta: Date;
  arrivalDate: Date;
  delayMins: number; // positive => delay, negative => early
  payment: number;
}
