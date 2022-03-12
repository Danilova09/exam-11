import { ItemsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createItemFailure,
  createItemRequest, createItemSuccess,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess, getItemFailure, getItemRequest, getItemSuccess,
} from './items.actions';

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
  item: null,
  itemLoading: false,
  itemError: null,
  createLoading: false,
  createError: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true})),
  on(fetchItemsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(getItemRequest, (state, {itemId}) => ({...state, fetchLoading: true})),
  on(getItemSuccess, (state, {item}) => ({...state, fetchLoading: false, item})),
  on(getItemFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createItemRequest, (state, {itemData}) => ({...state, fetchLoading: true})),
  on(createItemSuccess, (state) => ({...state, fetchLoading: false})),
  on(createItemFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
);
