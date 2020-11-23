import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  getAll(type?: number): Observable<Category[]> {
    return this._http.get<Category[]>('assets/data/data-slide.json').pipe(
      map((res: Category[]) => {
        {
          if (res == null) {
            return res;
          }
          res = res.filter((a) => a.categoryType === type);
          return res;
        }
      })
    );
  }
}
