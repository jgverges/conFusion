import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
/* import { PROMOTIONS } from '../shared/promotions'; */
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
// Rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
// Service
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+'promotions').pipe(
      catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string):Observable<Promotion> {
    return this.http.get<Promotion>(baseURL+'promotions/'+ id).pipe(
      catchError(this.processHTTPMsgService.handleError)
    )
 }


  getFeaturedPromotion():Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(
      map(promotions => promotions[0]),
      catchError(this.processHTTPMsgService.handleError)
      );
  }

}
