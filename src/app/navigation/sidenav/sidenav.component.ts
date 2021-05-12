import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'
import * as UI from './../../shared/ui.actions'
import * as AUTH from './../../auth/auth.actions'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onCloseSidenav() {
    this.store.dispatch(new UI.CloseSidenav);
  }
  onLogOut() {
    this.authService.logOut()
  }
}
