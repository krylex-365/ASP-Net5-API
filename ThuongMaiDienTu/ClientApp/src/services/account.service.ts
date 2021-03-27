import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Account[]>(this.url + 'api/Account');
  }
}
