import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeForm } from './consignee-form';

describe('ConsigneeForm', () => {
  let component: ConsigneeForm;
  let fixture: ComponentFixture<ConsigneeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigneeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
