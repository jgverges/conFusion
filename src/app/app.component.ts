import { Component } from '@angular/core';
// awesome
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conFusion';
  faCoffee = faCoffee; 
}
