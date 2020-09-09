import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
/* service */
import { LeaderService } from '../services/leader.service';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host : {
    '[@flyInOut]' : 'true',
    'style' : 'display : block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess : string;

  constructor( private leaderService: LeaderService,
    @Inject ('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe( leathers => this.leaders =leathers ,
      errMess => this.errMess = <any>errMess);
  }

}
