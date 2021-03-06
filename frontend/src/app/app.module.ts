import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { usersReducer } from './store/users.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { UsersEffects } from './store/users.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsComponent } from './pages/items/items.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatCardModule } from '@angular/material/card';
import { itemsReducer } from './store/items.reducer';
import { ItemsEffects } from './store/items.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImagePipe } from './pipes/image.pipe';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { categoriesReducer } from './store/categories.reducer';
import { CategoriesEffects } from './store/categories.effects';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ValidatePhoneDirective } from './validate-phone.directive';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ItemsComponent,
    CenteredCardComponent,
    ImagePipe,
    ItemDetailsComponent,
    NewItemComponent,
    FileInputComponent,
    ValidatePhoneDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      users: usersReducer,
      items: itemsReducer,
      categories: categoriesReducer,
    }, {metaReducers}),
    EffectsModule.forRoot([
      UsersEffects,
      ItemsEffects,
      CategoriesEffects,
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ExtendedModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
