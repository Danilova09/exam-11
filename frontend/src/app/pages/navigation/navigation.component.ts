import { Component } from '@angular/core';
import { logoutUserRequest } from '../../store/users.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent {
  user: Observable<null | User>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
