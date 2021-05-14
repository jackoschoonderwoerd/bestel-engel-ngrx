import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as AUTH from './auth.actions';
import * as UI from './../shared/ui.actions'
import * as fromAuth from './auth.reducer';
import { UIService } from '../shared/ui.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<fromAuth.AuthState>,
    private angularFireAuth: AngularFireAuth,
    private uiService: UIService,
    private router: Router
  ) { }

  initAuthListener() {
    this.store.dispatch(new UI.StartLoading);
    this.angularFireAuth.authState.subscribe(user => {
      if(user) {
        this.store.dispatch(new UI.StopLoading);
        console.log(user)
        this.store.dispatch(new AUTH.SetAuthenticated(user.email));
      } else {
        this.uiService.showSnackbar('You are not logged in', 'CLOSE', 5000);
        this.store.dispatch(new UI.StopLoading);
        console.log('no user');
        this.store.dispatch(new AUTH.SetUnauthenticated());
      }
    });
  }

  signUp(user: User) {
    this.store.dispatch(new UI.StartLoading);
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(result => {
      console.log(result);
      this.router.navigate(['/home'])
      this.store.dispatch(new UI.StopLoading);
      this.store.dispatch(new AUTH.SetAuthenticated(user.email));
    })
    .catch(err => {
      this.uiService.showSnackbar(err.message, 'CLOSE', 5000);
      this.store.dispatch(new UI.StopLoading);
      console.log(err)
    });
  }
  
  login(user: User) {
    this.store.dispatch(new UI.StartLoading);
    console.log(user);
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(result => {
      if(result.user.email === 'jackoboes@gmail.com') {
        console.log('is admin')
        this.router.navigate(['/admin'])
        this.store.dispatch(new AUTH.SetIsAdmin)
        this.store.dispatch(new UI.StopLoading);
        this.store.dispatch(new AUTH.SetAuthenticated(result.user.email));
      } else {
        console.log('is not admin')
        this.store.dispatch(new AUTH.SetIsNotAdmin)
        this.store.dispatch(new UI.StopLoading);
        this.router.navigate(['/home'])
        console.log(result);
        this.store.dispatch(new AUTH.SetAuthenticated(result.user.email));
      }
    })
    .catch(err => {
      this.uiService.showSnackbar(err.message, 'CLOSE', 5000);
      this.store.dispatch(new UI.StopLoading);
      this.store.dispatch(new AUTH.SetUnauthenticated);
      console.log(err)
    });
  }
  logOut() {
    this.angularFireAuth.signOut();
    this.store.dispatch(new AUTH.SetUnauthenticated());
    this.store.dispatch(new AUTH.SetIsNotAdmin());
    this.router.navigate(['login'])
  }
}
