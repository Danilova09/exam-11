import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import {
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  getItemFailure,
  getItemRequest,
  getItemSuccess,
} from './items.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions: Actions,
    private itemsService: ItemsService,
  ) {}

  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(() => this.itemsService.getItems().pipe(
      map(items => fetchItemsSuccess({items})),
      catchError(() => of(fetchItemsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  getItemById= createEffect(() => this.actions.pipe(
    ofType(getItemRequest),
    mergeMap(({itemId}) => this.itemsService.getItemById(itemId).pipe(
      map(item => getItemSuccess({item})),
      catchError(() => of(getItemFailure({
        error: 'Something went wrong'
      })))
    ))
  ));
}
