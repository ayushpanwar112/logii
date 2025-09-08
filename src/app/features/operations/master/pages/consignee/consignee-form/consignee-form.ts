import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsigneeFormClass } from '../../../modal-interface/consignee-modal-interface/consignee-form.model';
import { ConsigneeService } from '../../../services/consignee-service/consignee.service';

@Component({
  selector: 'app-consignee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consignee-form.html',
  styleUrl: './consignee-form.scss'
})
export class ConsigneeFormComponent implements OnInit {
  @Input() openbtn!: boolean;
  @Output() openbtnChange = new EventEmitter<boolean>();
  @Input() selectedConsignee: any; // to receive data from parent component
  @Output() refreshList = new EventEmitter<void>();
@Input() modeType!:string; // to differentiate between add and edit mode
  consigneeFormData: ConsigneeFormClass = new ConsigneeFormClass();
  isVerified: boolean | null = null;

  constructor(private consigneeService: ConsigneeService) { }

  ngOnInit(): void {
    console.log(this.selectedConsignee);
    this.modalMapping();
  }

  modalMapping(): void {
    if (this.selectedConsignee) {
      // Map all the properties from selectedConsignee to consigneeFormData
      this.consigneeFormData.cneId = this.selectedConsignee.CneId;
      this.consigneeFormData.cneGstIn = this.selectedConsignee.CneGstIn;
      this.consigneeFormData.cneName = this.selectedConsignee.CneName;
      this.consigneeFormData.cneCode = this.selectedConsignee.CneCode;
      this.consigneeFormData.cnePrintAs = this.selectedConsignee.CnePrintAs;
      this.consigneeFormData.cneAddress = this.selectedConsignee.CneAddress;
      this.consigneeFormData.cneCtyId = this.selectedConsignee.CneCtyId;
      this.consigneeFormData.cnePinCode = this.selectedConsignee.CnePinCode;
      this.consigneeFormData.cneStaId = this.selectedConsignee.CneStaId;
      this.consigneeFormData.cneCntId = this.selectedConsignee.CneCntId;
      this.consigneeFormData.cneContactPerson = this.selectedConsignee.CneContactPerson;
      this.consigneeFormData.cnePhoneNo = this.selectedConsignee.CnePhoneNo;
      this.consigneeFormData.cneMobileNo = this.selectedConsignee.CneMobileNo;
      this.consigneeFormData.cneEmail = this.selectedConsignee.CneEmail;
      this.consigneeFormData.cnePan = this.selectedConsignee.CnePan;
      this.consigneeFormData.cneWhatsApp = this.selectedConsignee.CneWhatsApp;
      this.consigneeFormData.cneCreateAcm = this.selectedConsignee.CneCreateAcm;
      this.consigneeFormData.cneRemarks = this.selectedConsignee.CneRemarks;
      this.consigneeFormData.cneStsCode = this.selectedConsignee.CneStsCode;
      this.consigneeFormData.cneAddUser = this.selectedConsignee.CneAddUser;
      this.consigneeFormData.cneAddDate = this.selectedConsignee.CneAddDate;
      this.consigneeFormData.cneModUser = this.selectedConsignee.CneModUser;
      this.consigneeFormData.cneModDate = this.selectedConsignee.CneModDate;
      this.consigneeFormData.cneVMobile = this.selectedConsignee.CneVMobile;
      this.consigneeFormData.cneVPan = this.selectedConsignee.CneVPan;
      this.consigneeFormData.cneVGstin = this.selectedConsignee.CneVGstin;
      this.consigneeFormData.cneVWno = this.selectedConsignee.CneVWno;
      this.consigneeFormData.cneVEmail = this.selectedConsignee.CneVEmail;
      this.consigneeFormData.cneVPin = this.selectedConsignee.CneVPin;
      this.consigneeFormData.cneCtyName = this.selectedConsignee.CneCtyName;
      this.consigneeFormData.cneStaName = this.selectedConsignee.CneStaName;
      this.consigneeFormData.cneCntName = this.selectedConsignee.CneCntName;
      this.consigneeFormData.cneNameId = this.selectedConsignee.CneNameId;
      this.consigneeFormData.reason = this.selectedConsignee.Reason;
    }
  }

  closeBtn(): void {
    this.openbtn = false;
    this.openbtnChange.emit(this.openbtn);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.consigneeService.createConsignee(this.consigneeFormData).subscribe({
        next: (response) => {
          console.log('Consignee created successfully:', response);
          this.openbtn = false;
          this.openbtnChange.emit(this.openbtn);
          form.resetForm(); // Reset after save
          this.refreshList.emit(); // Notify parent to refresh the list
        },
        error: (error) => {
          console.error('Error creating consignee:', error);
          alert('Error creating consignee: ' + (error?.message || 'Unknown error'));
        }
      });
    } else {
      Object.values(form.controls).forEach((c: any) => c.markAsTouched());
    }
  }

  focusNext(event: any): void {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const form = target.form as HTMLFormElement;
    const index = Array.prototype.indexOf.call(form, target);
    if (form.elements[index + 1]) {
      (form.elements[index + 1] as HTMLElement).focus();
    }
  }

  verifyMobile(): void {
    if (this.consigneeFormData.cneMobileNo && /^[6-9][0-9]{9}$/.test(this.consigneeFormData.cneMobileNo)) {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeBtn();
    }
    if (event.key === 'F10') {
      event.preventDefault();
      const formElement = document.querySelector('form') as HTMLFormElement;
      if (formElement) formElement.requestSubmit();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const key = event.key;

    // Allow only digits 0-9, backspace, delete, tab, escape, enter, and arrow keys
    if (/^[0-9]$/.test(key) || 
        ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
      return true;
    }

    event.preventDefault(); 
    return false;
  }
}

