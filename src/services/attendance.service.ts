
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) {}

  private getHeaders(contentType: string = ''): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headersConfig: any = { Authorization: `Bearer ${token}` };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }

  // signIn(data: any): Observable<any> {
  //   return this.http.post(this.apiUrl, data,  {
  //     headers: this.getHeaders(''),});
  // }

  signIn(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signIn`, data,  {
      headers: this.getHeaders(''),});
  }

    signOut(employeeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/signOut`, { employeeId },{
      headers: this.getHeaders(''),});
  }


}



