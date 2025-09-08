import { inject, Injectable } from '@angular/core';
import { ConsigneeFormInterface } from '../../modal-interface/consignee-modal-interface/consignee-form.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { consigneeListApiInterface } from '../../modal-interface/consignee-modal-interface/consignee-list.model';

@Injectable({
  providedIn: 'root'
})
export class ConsigneeService {
  
private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'http://devapi.lozics.io/api'/* environment.apiUrl; */
  private readonly Code: string = '140-9299-524-DEV'/* environment.Code; */

  /**
   * Creates a new consignee
   * @param consigneeData - The consignee data to create
   * @returns Observable with the creation response
   */
  createConsignee(consigneeData: ConsigneeFormInterface): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/Consignee`, consigneeData, { headers });
  }
   
  updateConsigneeRow(id: number, consigneeData: ConsigneeFormInterface): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/Consignee/${id}`, consigneeData, { headers });
  }

  /**
   * Gets the list of consignees
   * @param params - Query parameters for filtering/pagination
   * @returns Observable with consignee list data
   */
  getConsignees(params: any): Observable<consigneeListApiInterface> {
    const headers = this.getHeaders();
    return this.http.get<consigneeListApiInterface>(
      `${this.baseUrl}/Consignee/GetConsigneeList`, 
      { headers, params }
    );
  }

  /**
   * Deletes consignee data
   * @param params - Parameters containing consignee ID and other delete info
   * @returns Observable with delete response
   */
  deleteConsigneeData(params: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(
      `${this.baseUrl}/Consignee/DeleteConsignee`, 
      { headers, params }
    );
  }

  /**
   * Gets dropdown options for delete reasons
   * @returns Observable with dropdown data
   */
  dropdownDeleteConsignee(): Observable<any> {
    const params = new HttpParams().set('Type', 'DELETE REASON');
    const headers = this.getHeaders();
    
    return this.http.get(
      `${this.baseUrl}/Common/BindDropDown`, 
      { headers, params }
    );
  }

  /**
   * Gets consignee details by ID
   * @param id - The consignee ID
   * @returns Observable with consignee details
   */
  viewConsigneeById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/Consignee/${id}`, { headers });
  }

  /**
   * Cancels a consignee
   * @param params - Parameters for cancellation
   * @returns Observable with cancellation response
   */
  cancelConsignee(params: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.baseUrl}/Consignee/Actions`, 
      { headers, params }
    );
  }

  /**
   * Private method to create consistent headers
   * @returns HttpHeaders with the Code header
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Code': this.Code,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Updates an existing consignee
   * @param id - The consignee ID
   * @param consigneeData - The updated consignee data
   * @returns Observable with update response
   */
  updateConsignee(id: string, consigneeData: ConsigneeFormInterface): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/Consignee/${id}`, consigneeData, { headers });
  }

  /**
   * Gets consignee statistics/summary
   * @returns Observable with statistics data
   */
  getConsigneeStats(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/Consignee/Stats`, { headers });
  }
 getMobileNo(mobileNo:number):Observable<any>{
    const headers = this.getHeaders();
    const params = new HttpParams().set('MobileNo', mobileNo);
    return this.http.get(`${this.baseUrl}/Consignee/GetConsigneeIdByMobileNo`, { headers, params });
  }

}
