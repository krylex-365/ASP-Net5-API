import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IAccount } from '../models/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IAccount[]>(this.url + 'api/Account');
  }
}
