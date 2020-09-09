import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// Service
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

constructor( private http: HttpClient,
             private processHTTPMsgService : ProcessHTTPMsgService) { }

getLeaders(): Observable <Leader[]> {
  return this.http.get<Leader[]>(baseURL+'leadership')
  .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: string):Observable <Leader> {
  return this.http.get<Leader>(baseURL+'leadership/'+id)
}

getFeaturedLeader():Observable <Leader> {
  return this.http.get<Leader>(baseURL+'leadership?featured=true')
  .pipe(
    map(leader => leader[0]),
    catchError(this.processHTTPMsgService.handleError));
}

}
