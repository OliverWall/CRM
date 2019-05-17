import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';

import {AuthService} from '../common/services/auth.service';
import {MaterialService} from '../common/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь Вы можете войти в систему используя свои данные');
      } else if (params['accessDenied']) {
        MaterialService.toast('Вы должны авторизоваться');
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    this.authSub = this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/site/overview']),
      error: err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    });
  }
}
