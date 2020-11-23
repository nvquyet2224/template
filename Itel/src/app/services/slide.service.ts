import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTypeEnum } from '../models/enum/page-type-enum';
import { ListMusic } from '../models/listMusic';
import { Slide } from '../models/slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private _http: HttpClient) { }

  getAll(type: number): Observable<Slide[]> {
    return this._http.get<Slide[]>("assets/data/data-slide.json").pipe(
      map((res: Slide[]) => {
        {
          if (res == null) {
            return res;
          }
          res.filter((a) => a.slideType === type);
           return res;
        }
      })
    );
  }
}
