import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import {
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
} from './items.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions: Actions,
    private ItemsService: ItemsService,
    private router: Router,
  ) {}

  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(() => this.ItemsService.getItems().pipe(
      map(items => fetchItemsSuccess({items})),
      catchError(() => of(fetchItemsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));
}
