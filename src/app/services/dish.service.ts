import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
// Rxjs
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
// Service
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http: HttpClient,
               private processHTTPMsgService : ProcessHTTPMsgService) { }

  getDishes(): Observable <Dish []> {  
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable <Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable <Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(
      map (dishes => dishes[0]),
      catchError(this.processHTTPMsgService.handleError)
      );
  }
  getDishIds() : Observable <string[] |any>{
    return this.getDishes().pipe(
      map( dishes => dishes.map(dish => dish.id)),
      catchError(error => error)
      );
  }
}
