import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/types';
import { getItemRequest } from '../../store/items.actions';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.sass']
})
export class ItemDetailsComponent implements OnInit {
  item!: Observable<null | Item>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.item = this.store.select(state => state.items.item);
  }

  ngOnInit(): void {
    const itemId= this.route.snapshot.params['id'];
    this.store.dispatch(getItemRequest({itemId}));
  }
}
