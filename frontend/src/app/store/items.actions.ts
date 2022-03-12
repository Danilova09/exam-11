import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request');
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{items: Item[]}>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{error: string}>());

export const getItemRequest = createAction('[Items] Create Request', props<{itemId: string}>());
export const getItemSuccess = createAction('[Items] Create Success', props<{item: Item}>());
export const getItemFailure = createAction('[Items] Create Failure', props<{error: string}>());
