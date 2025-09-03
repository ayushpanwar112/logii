import { Component } from '@angular/core';

@Component({
  selector: 'app-consignee',
  standalone: true,
  imports: [],
  templateUrl: './consignee.html',
  styleUrl: './consignee.scss'
})
export class Consignee {
  ngOnInit() {
    console.log('Consignee component initialized');
  }

}
