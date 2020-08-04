import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
    
  @Input () dishdetail: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
