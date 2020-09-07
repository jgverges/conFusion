import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute }   from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from 'src/app/services/dish.service';
import { Dish }     from 'src/app/shared/dish';
import { Comment }     from 'src/app/shared/comment';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { visibility, flyInOut, expand} from '../../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host : {
    '[@flyInOut]' : 'true',
    'style' : 'display : block;'
  },
  animations : [
    flyInOut(),
    visibility(),
    expand()
  ],
})
export class DishdetailComponent implements OnInit {
    
  dish: Dish;
  dishIds: string [];
  dishcopy : Dish;
  errMess : string;
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  visibility = 'shown';
  @ViewChild ('cform') feedbackFormDirective;

  formErrors ={
    'author' : '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required' :'Author name is required',
      'minlength':'Author name must be alt least 2 characters long',
      'maxlength':'Author name cannot be more than 25 characters long'
    },
    'comment': {
      'required' :'Comment is required',
      'minlength':'Comment must be alt least 2 characters long'
    }
  }

  constructor( private dishService: DishService,
               private route: ActivatedRoute,
               private location: Location,
               private fb: FormBuilder,
               @Inject ('BaseURL') private BaseURL) {
                this.createForm();
              }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe
    (switchMap((params: Params) => {this.visibility = 'hidden';
                                    return this.dishService.getDish(params['id']);}) )                                                  
    .subscribe(dish => { this.dish = dish;
                         this.dishcopy = dish; 
                         this.setPrevNext(dish.id);

                         this.visibility = "shown"; },
              errMess => this.errMess = <any>errMess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
              }
  goBack() {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment:  [ '', [Validators.required, Validators.minLength(2)] ],
      rating: 5,
      date: ''
    });

    this.commentForm.valueChanges
    .subscribe( data => this.onValueChanged(data));

    this.onValueChanged() // (re) set from validations messages
  }

    
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.comment.date= new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe( dish => {
                        this.dish = dish;
                        this.dishcopy = dish;
                        },
                errmess => {
                        this.dish = null;
                        this.dishcopy = null;
                        this.errMess = <any> errmess;
                        }
    );
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5,
      date: ''
    });
/*     this.feedbackFormDirective.resetForm();
    this.createForm();
 */  }

}
