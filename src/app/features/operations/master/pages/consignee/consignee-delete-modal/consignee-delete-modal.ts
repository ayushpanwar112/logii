import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Branch, consigneeCancelClass, consigneeDeleteClass, Master } from '../../../modal-interface/consignee-modal-interface/consignee-list.model';
import { ConsigneeService } from '../../../services/consignee-service/consignee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consignee-delete-modal',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './consignee-delete-modal.html',
  styleUrl: './consignee-delete-modal.scss'
})
export class ConsigneeDeleteModal {



  @Input() consigneeId: number | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Input() typeofMode!:string; // to differentiate between delete and cancel
  @Input() consigneeStscode!:number|null;
    @Input() refreshFn!: () => void;


  constructor(private consgineeService:ConsigneeService) { }

  branchList: Branch[] = [];
masterList: Master[] = [];

reason:string='APPROVED DELETE';


  deleteConsignee: consigneeDeleteClass = new consigneeDeleteClass();
  cancelConsignee: consigneeCancelClass=new consigneeCancelClass();
 

  ngOnInit(): void {
   // console.log(this.typeofMode)
   console.log(this.consigneeId,"id by id")
   this.deleteRecord();
   if (this.consigneeId !== null) {
     this.SelectMode();
   } else {
     console.warn('ConsigneeDeleteModal initialized without a valid consigneeId');
   }
    
    
  }
 
SelectMode() {
  if (this.consigneeId == null) {
    console.warn('SelectMode called without consigneeId');
    return;
  }
  switch (this.typeofMode) {
    case 'CANCEL':
      console.log(this.consigneeId,"case");
      this.cancelConsignee.Id = this.consigneeId;
      this.cancelConsignee.Reason = this.reason;
      this.cancelConsignee.User='SYSTEM';
      this.cancelConsignee.StatusCode = 2;/* this.consigneeStscode */
      break;

    case 'DELETE':
      this.deleteConsignee.Id = this.consigneeId;
      this.deleteConsignee.Reason = this.reason;
      break;

    default:
      console.warn('Unknown mode:', this.typeofMode);
      break;
  }
}



  cancel() {
    this.closeModal.emit();
  }

  deleteRecord() {   // this is dropdown for delete reason
   
    this.consgineeService.dropdownDeleteConsignee().subscribe({
      next:(response:any)=>{
        this.masterList=response.MasterList;
       
        
      },
      error:(error)=>{
        console.error('Error deleting consignee:',error);
        alert('Error deleting consignee: '+(error?.message || 'Unknown error'));
      }
    })
  }

deleteConfirm() {
  switch (this.typeofMode) {
    case 'CANCEL':
      this.consgineeService.cancelConsignee(this.cancelConsignee).subscribe({
        next: (res) => {
          console.log('Consignee cancelled successfully:', res);
          this.cancel();
          this.refreshFn(); 
        },
        error: (e) => {
          console.error('Error cancelling consignee:', e);
          alert('Error cancelling consignee: ' + (e?.message || 'Unknown error'));
        }
      });
      break;

    case 'DELETE':
      this.consgineeService.deleteConsigneeData(this.deleteConsignee).subscribe({
        next: (response) => {
          console.log('Consignee deleted successfully:', response);
          this.cancel();
          this.refreshFn(); 
        },
        error: (error) => {
          console.error('Error deleting consignee:', error);
          alert('Error deleting consignee: ' + (error?.message || 'Unknown error'));
        }
      });
      break;

    default:
      console.warn('Unknown mode:', this.typeofMode);
      break;
  }
}


}
