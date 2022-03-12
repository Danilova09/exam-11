import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(env.apiUrl + '/items');
  }

  getItemById(itemId: string) {
    return this.http.get<Item>(env.apiUrl + '/items/' + itemId);
  }
}
