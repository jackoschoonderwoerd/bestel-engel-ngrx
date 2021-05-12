import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from './../../app.reducer';
import * as UI from './../../shared/ui.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail$: Observable<string>

  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userEmail$ = this.store.select(fromRoot.getUserEmail)
  }
  onOpenSidenav() {
    this.store.dispatch(new UI.OpenSidenav);
  }
  onLogOut() {
    this.authService.logOut()
  }
}
