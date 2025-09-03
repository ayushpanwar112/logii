import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsigneeApiResponse, consigneeListClass } from '../../../modal-interface/consignee-modal-interface/consignee-list.model';
import { ConsigneeService } from '../../../services/consignee-service/consignee.service';
import { CommonModule } from '@angular/common';
import { ConsigneeFormComponent } from "../consignee-form/consignee-form";
import { ConsigneeDeleteModal } from "../consignee-delete-modal/consignee-delete-modal";

@Component({
  selector: 'app-consignee.list',
  standalone: true,
  imports: [FormsModule, CommonModule, ConsigneeFormComponent, ConsigneeDeleteModal],
  templateUrl: './consignee.list.html',
  styleUrl: './consignee.list.scss'
})
export class ConsigneeList {


  selectedConsigneeId: number | null = null;
  isDeleteOpen: boolean = false;
  consogneeListApiData: ConsigneeApiResponse[] = []; // to show data in table
  selectedConsigneeForm: any = null; // to pass data to form component
  selectedStscode: number | null = null;
  searchText: string = '';
  consigneeList: consigneeListClass = new consigneeListClass(); // to call api
  mode: string = 'LIST';
  isFormOpen: boolean = false;
  isFilterShow: boolean = false;

  constructor(private consigneeListService: ConsigneeService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.consigneeListService.getConsignees(this.consigneeList).subscribe({
      next: (response) => {
        this.consogneeListApiData = response.consignee;
      },
      error: (error) => {
        console.error('Error fetching consignee list:', error);
        alert('Error fetching consignee list: ' + (error?.message || 'Unknown error'));
      }
    });
  }

  getEmptyRows(): any[] {
    const toFill = 20 - this.consogneeListApiData.length;
    return Array(toFill > 0 ? toFill : 0);
  }

  openForm(): void {
    this.isFormOpen = true;
  }

  openFilter(): void {
    this.isFilterShow = !this.isFilterShow;
  }

  resetSearch(): void {
    this.getList();
  }

  openDeleteModal(id: string | number): void {
    const numericId = Number(id);
    this.mode = 'DELETE';
    this.selectedConsigneeId = isNaN(numericId) ? null : numericId;
    if (this.selectedConsigneeId !== null) {
      this.isDeleteOpen = true;
    }
  }

  closeDeleteModal(): void {
    this.isDeleteOpen = false; // hide the modal
    this.selectedConsigneeId = null;
  }

  viewConsignee(id: string | number): void {
    this.mode = 'VIEW';
    this.consigneeListService.viewConsigneeById(String(id)).subscribe({
      next: (response: any) => {
        this.selectedConsigneeForm = response.city;
        this.openForm();
      },
      error: (error) => {
        console.error('Error fetching consignee data:', error);
        alert('Error fetching consignee data: ' + (error?.message || 'Unknown error'));
      }
    });
  }

  cancelConsigneeRow(id: string | number, stscode: number): void {
    const numericId = Number(id);
    this.mode = 'CANCEL';
    this.selectedConsigneeId = isNaN(numericId) ? null : numericId;
    this.selectedStscode = stscode;
    if (this.selectedConsigneeId !== null) {
      this.isDeleteOpen = true;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'F1') {
      event.preventDefault(); // stops browser help from opening
      this.openForm();
    }
  }


}
