import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store'
import * as fromRoot from './app.reducer';
import { AuthService } from './auth/auth.service';
import * as UI from './shared/ui.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bestel-engel-ngrx';
  isOpened: boolean = true;
  

  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService
    
  ) {}

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.store.select(fromRoot.getIsSidenavOpen).subscribe((isOpened: boolean) => {
      this.isOpened = isOpened;
    })
    this.authService.initAuthListener();
    
  }
  closed() {
    this.store.dispatch(new UI.CloseSidenav);
  }

  
}

