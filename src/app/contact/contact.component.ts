import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host : {
    '[@flyInOut]' : 'true',
    'style' : 'display : block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  errMess : string;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  submittingForm = false;
  showSubmited = false;
  @ViewChild ('fform') feedbackFormDirective;

  formErrors ={
    'firstname': '',
    'lastname': '',
    'telnum' :'',
    'email':''
  };

  validationMessages = {
    'firstname': {
      'required' :'First name is required',
      'minlength':'First name must be alt least 2 characters long',
      'maxlength':'First name cannot be more than 25 characters long'
    },
    'lastname': {
      'required' :'Last name is required',
      'minlength':'Last name must be alt least 2 characters long',
      'maxlength':'Last name cannot be more than 25 characters long'
    },
    'telnum': {
      'required' :'Tel. number is required',
      'pattern'  :'Tel. number must be only numbers'
    },
    'email': {
      'required' :'Email is required',
      'email'    :'Email not in correct format.'
    }
    
  }

  constructor(private fb: FormBuilder,
    private feedbackServices : FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname:  [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: [0,[Validators.required, Validators.pattern]],
      email: ['',[Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe( data => this.onValueChanged(data));

    this.onValueChanged() // (re) set from validations messages
  }

    
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    this.submittingForm =true;
      console.log(this.feedback);
    this.feedbackServices.submitFeedback(this.feedback)
    .subscribe(
      feedback => { this.feedback = feedback;
                    this.showFeedbackSubmited();
                  },
      errmess =>  { this.feedbackForm = null ;
                    this.errMess = <any>errmess;
                    this.submittingForm = false;
                  },
    );

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

  }
  showFeedbackSubmited(){
    this.showSubmited = true;
    console.log('this.showSubmited'+this.showSubmited);
    setTimeout( () => { 
      this.showSubmited = false;
      this.submittingForm = false;
      console.log('this.showSubmited after 5000'+this.showSubmited);
    }, 5000);
  }
  
}