import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  API = `https://67e0d94c58cc6bf78523245f.mockapi.io/api/v1/users`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.API}`);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete<any>(`${this.API}/${userId}`);
  }

  postUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.API}`, user);
  }

  updateUser(userId: any, user: any): Observable<any> {
    return this.http.put<any>(`${this.API}/${userId}`, user);
  }
}
