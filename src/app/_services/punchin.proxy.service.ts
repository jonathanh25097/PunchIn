import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { Record, User } from '../_models/PunchIn';

@Injectable({
  providedIn: 'root',
})
export class PunchingProxyService {
  constructor(private http: HttpClient) {} // Inject HttpClient

  baseUrl = 'https://pinchinfastapi.azurewebsites.net/';
  usersController = 'users/';
  recordsController = 'records/';

  public login(username: string, password: string): Observable<User> {
    const url = this.baseUrl + this.usersController + 'login';
    return this.http.post<User>(url, { username, password });
  }

  public clockIn(record: Record): Observable<Record> {
    const url = this.baseUrl + this.recordsController + 'clock-in';
    return this.http.put<Record>(url, record);
  }

  public clockOut(userId: string): Observable<Record> {
    const url = this.baseUrl + this.recordsController + 'clock-out';
    return this.http.post<Record>(url, { userId });
  }
  public getLastRecord(userId: string): Observable<Record> {
    const url =
      this.baseUrl + this.recordsController + userId + '/get-latest-record';
    return this.http.get<Record>(url);
  }

  public getLastFiveRecords(userId: string): Observable<Record[]> {
    const url = this.baseUrl + this.recordsController + userId;
    return this.http.get<Record[]>(url);
  }
}
