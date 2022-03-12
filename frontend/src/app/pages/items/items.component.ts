import { Component, OnInit } from '@angular/core';
import { deleteItemRequest, fetchItemsByCategoryRequest, fetchItemsRequest } from '../../store/items.actions';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  items!: Observable<Item[]>;
  user!: Observable<null | User>;

  categories!: Observable<Category[]>;
  loading!: Observable<boolean>;
  error!: Observable<null | string>;
  env = environment;

  constructor(private store: Store<AppState>) {
    this.items = this.store.select(state => state.items.items);
    this.loading = this.store.select(state => state.items.fetchLoading);
    this.error = this.store.select(state => state.items.fetchError);
    this.categories = store.select(state => state.categories.categories);
    this.store.select(state => state.users.user).subscribe(user => {
      console.log(user);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fetchItemsRequest());
    this.store.dispatch(fetchCategoriesRequest());
  }

  getAllItems() {
    this.store.dispatch(fetchItemsRequest());
  }

  changeCategory(_id: string) {
    this.store.dispatch(fetchItemsByCategoryRequest({categoryId: _id}));
  }

  deleteItem(itemId: string) {
    this.store.dispatch(deleteItemRequest({itemId}));
    this.store.dispatch(fetchItemsRequest());
  }
}
