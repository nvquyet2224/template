import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ListMusic } from '../models/listMusic';

@Injectable({
  providedIn: 'root'
})
export class MusicListService {

  constructor(private _http: HttpClient) { }
  
  getAll(): Observable<ListMusic[]> {
    return this._http.get<ListMusic[]>("assets/data/data-list.json");
  }
}
