import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/shared/dish';
import { DISHES } from 'src/app/shared/dishes';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

    dish= DISHES[0];
    
  @Input () dishdetail: Dish;

  constructor() { }

  ngOnInit(): void {
      console.log( this.dish,'*** dish');
      console.log( this.dishdetail,'***_______ dishdetail');
  }

}
