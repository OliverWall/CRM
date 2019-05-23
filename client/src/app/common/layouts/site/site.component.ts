import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  routes = [
    {url: 'overview', name: 'Обзор'},
    {url: 'analytics', name: 'Аналитика'},
    {url: 'history', name: 'История'},
    {url: 'order', name: 'Добавить заказ'},
    {url: 'categories', name: 'Ассортимент'}
  ];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
