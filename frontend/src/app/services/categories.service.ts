import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Category } from '../models/category.model';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(env.apiUrl + '/categories');
  }
}
