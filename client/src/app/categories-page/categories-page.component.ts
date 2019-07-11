import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {CategoriesService} from '../common/services/categories.service';
import {Category} from '../common/interfaces/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.getAll();
  }

}
