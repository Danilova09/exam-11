import { createAction, props } from '@ngrx/store';
import { Item, ItemData } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request');
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{items: Item[]}>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{error: string}>());

export const getItemRequest = createAction('[Items] Fetch Request', props<{itemId: string}>());
export const getItemSuccess = createAction('[Items] Fetch Success', props<{item: Item}>());
export const getItemFailure = createAction('[Items] Fetch Failure', props<{error: string}>());

export const createItemRequest = createAction('[Items] Create Request', props<{itemData: ItemData}>());
export const createItemSuccess = createAction('[Items] Create Success');
export const createItemFailure = createAction('[Items] Create Failure', props<{error: string}>());
