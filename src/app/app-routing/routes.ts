import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { DishdetailComponent } from '../menu/dishdetail/dishdetail.component';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
    { path: 'home',     component: HomeComponent},
    { path:'contact',   component: ContactComponent},
    { path:'about',     component: AboutComponent},
    { path:'menu' ,     component: MenuComponent},
    { path: '',  redirectTo: '/home', pathMatch: 'full'}
]