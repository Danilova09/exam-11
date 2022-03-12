import { ItemsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createItemFailure,
  createItemRequest,
  createItemSuccess, deleteItemFailure, deleteItemRequest, deleteItemSuccess,
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

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
  item: null,
  itemLoading: false,
  itemError: null,
  createLoading: false,
  createError: null,
  deletingLoading: false,
  deletingError: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true})),
  on(fetchItemsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(fetchItemsByCategoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchItemsByCategorySuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsByCategoryFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(getItemRequest, (state, {itemId}) => ({...state, itemLoading: true})),
  on(getItemSuccess, (state, {item}) => ({...state, itemLoading: false, item})),
  on(getItemFailure, (state, {error}) => ({...state, itemLoading: false, itemError: error})),

  on(createItemRequest, (state, {itemData}) => ({...state, fetchLoading: true})),
  on(createItemSuccess, (state) => ({...state, fetchLoading: false})),
  on(createItemFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(deleteItemRequest, (state, {itemId}) => ({...state, deleteLoading: true})),
  on(deleteItemSuccess, (state) => ({...state, deleteLoading: false})),
  on(deleteItemFailure, (state, {error}) => ({...state, deleteLoading: false, deleteError: error})),
);
