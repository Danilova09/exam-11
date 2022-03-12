import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ItemData } from '../models/item.model';
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

  createItem(itemData: ItemData) {
    const formData = new FormData();
      Object.keys(itemData).forEach(key => {
        if (itemData[key] !== null) formData.append(key, itemData[key]);
      });
    return this.http.post<ItemData>(env.apiUrl + '/items', formData);
  }
}
