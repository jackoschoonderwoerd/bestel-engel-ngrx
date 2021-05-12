import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isAuth$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<fromRoot.GlobalState>
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('jackoboes@gmail.com', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('123456', { 
        validators: [Validators.required] })
    });
  }
  onSubmitLoginForm() {
    this.authService.login(this.loginForm.value)
  }
}
