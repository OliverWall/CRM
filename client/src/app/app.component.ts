import {Component, OnInit} from '@angular/core';
import {AuthService} from './common/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken !== null) {
      this.authService.setToken(localStorageToken);
    }
  }
}
