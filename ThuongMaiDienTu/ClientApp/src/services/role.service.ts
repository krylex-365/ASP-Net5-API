import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IRole } from '../models/role.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.url + 'api/Role');
    /*.pipe(
      map(data => {
        const roles: Array<IRole> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            roles.push(data[id])
          }
        }
        return roles;
      })
    )*/
  }
}
