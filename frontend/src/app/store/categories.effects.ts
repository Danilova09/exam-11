import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../services/categories.service';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess, } from './categories.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
  ) {}

  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      catchError(() => of(fetchCategoriesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));
}
