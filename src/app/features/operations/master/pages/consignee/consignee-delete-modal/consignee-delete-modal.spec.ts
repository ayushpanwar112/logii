import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeDeleteModal } from './consignee-delete-modal';

describe('ConsigneeDeleteModal', () => {
  let component: ConsigneeDeleteModal;
  let fixture: ComponentFixture<ConsigneeDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeDeleteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigneeDeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
