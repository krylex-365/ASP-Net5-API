import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Card } from '../models/card';

@Injectable()
export class CardService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getCardByCustomerId(id: string) {
    return this.http.get<Card[]>(this.url + 'api/Card/' + id);
  }

  add(card: Card) {
    return this.http.post<HttpResponse<Card>>(this.url + 'api/card', card, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Card>>(this.url + 'api/Card/' + id, { observe: 'response' });
  }
}
