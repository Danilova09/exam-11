import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemsComponent } from './pages/items/items.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { NewItemComponent } from './pages/new-item/new-item.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-item', component: NewItemComponent},
  {path: 'item-details/:id', component: ItemDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
