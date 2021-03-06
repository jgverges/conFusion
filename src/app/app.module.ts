import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/* import { HttpModule } from '@angular/http'; */
import { baseURL } from './shared/baseurl';
import { ReactiveFormsModule } from '@angular/forms';
// services
import { DishService } from './services/dish.service';
import { FeedbackService } from './services/feedback.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService} from './services/process-httpmsg.service';
// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DishdetailComponent } from './menu/dishdetail/dishdetail.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
// Material 
import { MatButtonModule} from '@angular/material/button';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule} from '@angular/material/select';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
// Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 // flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    /* HttpModule, */
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [ 
    DishService, 
    FeedbackService,
    LeaderService,
    ProcessHTTPMsgService,
    PromotionService, 
    { provide: 'BaseURL', useValue : baseURL} 
  ],
  entryComponents: [
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
