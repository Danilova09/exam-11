import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Item } from '../models/item.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(env.apiUrl + '/items').pipe(
      tap((items => {
        console.log(items);
      }))
    );
  }
}
