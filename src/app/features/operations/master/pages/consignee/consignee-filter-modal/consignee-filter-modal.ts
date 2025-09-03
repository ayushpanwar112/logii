import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consignee-filter-modal',
  imports: [],
  templateUrl: './consignee-filter-modal.html',
  styleUrl: './consignee-filter-modal.scss'
})
export class ConsigneeFilterModal {


   ngOnInit(): void {
  }

  
   @Output() toggleFilter = new EventEmitter<void>();

   closefilter(){
    this.toggleFilter.emit();
   }

}
