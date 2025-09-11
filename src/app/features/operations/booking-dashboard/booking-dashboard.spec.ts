import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDashboard } from './booking-dashboard';

describe('BookingDashboard', () => {
  let component: BookingDashboard;
  let fixture: ComponentFixture<BookingDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
