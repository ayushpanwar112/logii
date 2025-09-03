import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeList } from './consignee.list';

describe('ConsigneeList', () => {
  let component: ConsigneeList;
  let fixture: ComponentFixture<ConsigneeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigneeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
