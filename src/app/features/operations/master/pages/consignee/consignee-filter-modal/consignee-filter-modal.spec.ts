import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeFilterModal } from './consignee-filter-modal';

describe('ConsigneeFilterModal', () => {
  let component: ConsigneeFilterModal;
  let fixture: ComponentFixture<ConsigneeFilterModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeFilterModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigneeFilterModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
