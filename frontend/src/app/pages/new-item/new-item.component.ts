import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createItemRequest } from '../../store/items.actions';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  error!: Observable<null | string>;
  userId!: string | undefined;
  categoryId!: string;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.items.itemLoading);
    this.error = store.select(state => state.items.itemError);
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const itemData = {
        user: this.userId,
        category: '622c6d98b7feee986f771cdf',
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
        price: parseInt(this.form.controls['price'].value),
        image: this.form.controls['image'].value,
      }
      console.log(itemData);
      this.store.dispatch(createItemRequest({itemData}));
    }
  }
}
