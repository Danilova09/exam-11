import { Component, OnInit } from '@angular/core';
import { fetchItemsRequest } from '../../store/items.actions';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  items!: Observable<Item[]>;
  loading!: Observable<boolean>;
  error!: Observable<null | string>;
  env = environment;

  constructor(private store: Store<AppState>) {
    this.items = this.store.select(state => state.items.items);
    this.loading = this.store.select(state => state.items.fetchLoading);
    this.error = this.store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchItemsRequest());
  }
}
