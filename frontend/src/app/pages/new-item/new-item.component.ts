import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createItemRequest } from '../../store/items.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  categories!: Observable<Category[]>;
  loading!: Observable<boolean>;
  error!: Observable<null | string>;
  userId!: string | undefined;
  categoryId!: string;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.items.itemLoading);
    this.error = store.select(state => state.items.itemError);
    this.categories = store.select(state => state.categories.categories);
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
  }

  onSubmit() {
    if (this.form.valid) {
      const itemData = {
        user: this.userId,
        category: this.form.controls['category'].value,
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
        price: parseInt(this.form.controls['price'].value),
        image: this.form.controls['image'].value,
      }
      this.store.dispatch(createItemRequest({itemData}));
    }
  }
}
