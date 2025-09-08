import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsigneeApiResponse, consigneeListClass } from '../../../modal-interface/consignee-modal-interface/consignee-list.model';
import { ConsigneeService } from '../../../services/consignee-service/consignee.service';
import { CommonModule } from '@angular/common';
import { ConsigneeFormComponent } from "../consignee-form/consignee-form";
import { ConsigneeDeleteModal } from "../consignee-delete-modal/consignee-delete-modal";
import { ConsigneeFilterModal } from "../consignee-filter-modal/consignee-filter-modal";

@Component({
  selector: 'app-consignee.list',
  standalone: true,
  imports: [FormsModule, CommonModule, ConsigneeFormComponent, ConsigneeDeleteModal, ConsigneeFilterModal],
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
  
  private _isFormOpen: boolean = false;
  get isFormOpen(): boolean { return this._isFormOpen; }
  set isFormOpen(v: boolean) {
    this._isFormOpen = v;
    if (!v) {
      // When the form closes, reset to create mode so next open is fresh
      this.mode = 'CREATE';
      this.selectedConsigneeForm = null;
    }
  }
  isFilterShow: boolean = false;

  // Column configuration for table + filter modal
  columns = [
    { key: 'sr', label: 'Sr. No.', default: true },
    { key: 'mobile', label: 'Regd. Mobile No.', default: true },
    { key: 'gstin', label: 'GSTIN', default: true },
    { key: 'name', label: 'Name', default: true },
    { key: 'code', label: 'Code', default: true },
    { key: 'city', label: 'City', default: true },
    { key: 'pin', label: 'PIN', default: true },
    { key: 'state', label: 'State', default: true },
    { key: 'country', label: 'Country', default: true },
    { key: 'whatsapp', label: 'Whatsapp', default: false, field: 'Whatsapp' },
    { key: 'pan', label: 'PAN', default: false, field: 'PAN' },
    { key: 'phone', label: 'Phone', default: false, field: 'Phone' },
    { key: 'email', label: 'Email', default: false, field: 'Email' },
    { key: 'contact', label: 'Contact Person', default: false, field: 'Contact' },
    { key: 'address', label: 'Address', default: false, field: 'Address' },
    { key: 'editedUser', label: 'Edited User', default: false, field: 'Moduser' },
    { key: 'createdBy', label: 'Created By', default: false, field: 'Adduser' },
    { key: 'editedDate', label: 'Edited Date', default: false, field: 'Moddate', type: 'date' },
    { key: 'createdDate', label: 'Created Date', default: false, field: 'Adddate', type: 'date' },
    { key: 'status', label: 'Status', default: true },
    { key: 'action', label: 'Action', default: true }
  ];

  // Active visible columns set
  visibleColumns: Set<string> = new Set();

  constructor(private consigneeListService: ConsigneeService) { }

  ngOnInit(): void {
    // Attempt to load persisted column visibility
    const stored = typeof window !== 'undefined' ? localStorage.getItem('consignee.visibleColumns') : null;
    if (stored) {
      try {
        const arr: string[] = JSON.parse(stored);
        arr.forEach(k => this.visibleColumns.add(k));
      } catch {
        // fallback to defaults if parse fails
        this.columns.filter(c => c.default).forEach(c => this.visibleColumns.add(c.key));
      }
    } else {
      // initialize visible columns to defaults when nothing stored
      this.columns.filter(c => c.default).forEach(c => this.visibleColumns.add(c.key));
    }
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

  // Total number of currently visible columns (used for empty filler row colspan)
  getVisibleColumnCount(): number {
    return this.visibleColumns.size || 1; // fallback to 1 so table structure remains valid
  }

  openForm(mode: 'CREATE' | 'EDIT' | 'VIEW' = 'CREATE', data?: any): void {
    this.mode = mode;
    if (mode === 'CREATE') {
      this.selectedConsigneeForm = null;
    } else if (data !== undefined) {
      this.selectedConsigneeForm = data;
    }
    this.isFormOpen = true;
  }

  openFilter(): void {
    this.isFilterShow = !this.isFilterShow;
  }

  onApplyColumns(keys: string[]) {
    this.visibleColumns = new Set(keys);
  this.saveVisibleColumns();
    this.isFilterShow = false;
  }

  isColVisible(key: string): boolean {
    return this.visibleColumns.has(key);
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

  viewNedit(id: number, mode: 'VIEW' | 'EDIT') {
    this.consigneeListService.viewConsigneeById(String(id)).subscribe({
      next: (response: any) => {
        this.openForm(mode, response.city);
      },
      error: (error) => {
        console.error('Error fetching consignee data:', error);
        alert('Error fetching consignee data: ' + (error?.message || 'Unknown error'));
      }
    });
  }

  viewConsignee(id: string | number): void {
  this.mode = 'VIEW';
  this.viewNedit(Number(id), 'VIEW');
  
  }
  editConsignee(id: number): void {
  this.mode = 'EDIT';
  this.viewNedit(id, 'EDIT');
 /*  */
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

  private saveVisibleColumns(): void {
    try {
      localStorage.setItem('consignee.visibleColumns', JSON.stringify(Array.from(this.visibleColumns)));
    } catch {
      // ignore persistence errors
    }
  }


}
