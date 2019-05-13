import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../common/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  regSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {
    if (this.regSub) {
      this.regSub.unsubscribe();
    }
  }

  onSubmit() {
    this.regSub = this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['login'], {queryParams: {registered: true}});
      },
      error: err => {
        console.log(err);
        this.regSub.unsubscribe();
      }
    });
  }
}
