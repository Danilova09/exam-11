import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import {
  createItemFailure,
  createItemRequest,
  createItemSuccess, deleteItemFailure,
  deleteItemRequest, deleteItemSuccess,
  fetchItemsByCategoryFailure,
  fetchItemsByCategoryRequest,
  fetchItemsByCategorySuccess,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  getItemFailure,
  getItemRequest,
  getItemSuccess,
} from './items.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions: Actions,
    private itemsService: ItemsService,
    private router: Router,
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

  fetchItemsByCategory = createEffect(() => this.actions.pipe(
    ofType(fetchItemsByCategoryRequest),
    mergeMap(({categoryId}) => this.itemsService.getItemsByCategory(categoryId).pipe(
      map(items => fetchItemsByCategorySuccess({items})),
      catchError(() => of(fetchItemsByCategoryFailure({
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

  createItem = createEffect(() => this.actions.pipe(
    ofType(createItemRequest),
    mergeMap(({itemData}) => this.itemsService.createItem(itemData).pipe(
      map(() => createItemSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createItemFailure({error: 'Wrong data'})))
    ))
  ));

  deleteItem = createEffect(() => this.actions.pipe(
    ofType(deleteItemRequest),
    mergeMap(({itemId}) => this.itemsService.deleteItem(itemId).pipe(
      map(() => deleteItemSuccess()),
      catchError(() => of(deleteItemFailure({error: 'Wrong data'})))
    ))
  ));
}
