import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
// import { map} from 'rxjs/operators';
import { Banner } from "../models/banner";
import { PageTypeEnum } from "../models/enum/page-type-enum";
// import {filter}'rxjs/add/operator/filter';



@Injectable({
  providedIn: "root",
})
export class BannerService {
  public url = "assets/data/data-itel.json";
  constructor(private _http: HttpClient) {}

  getAll(type: number): Observable<Banner[]> {
    return this._http.get<Banner[]>("assets/data/data-banner.json").pipe(
      map((res: Banner[]) => {
        {
          if (res == null) {
            return res;
          }
          res = res.filter((a) => a.bannerType === type);
           return res;
        }
      })
    );
  }
  getList(): Observable<Banner> {
    return this._http.get<Banner>("assets/data/data-itel.json");
  }
  // getAll(type: number): Observable<Banner[]> {
  //   return this._http.get<Banner[]>("assets/data/data-itel.json").pipe(
  //     map((res: Banner[]) => {
  //       {
  //         if (res == null) {
  //           return res;
  //         }
  //         res = res.filter((a) => a.bannerType === type);
  //          return res;
  //       }
  //     })
  //   );
  // }
}
