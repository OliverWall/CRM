import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../common/services/categories.service';
import {Category} from '../common/interfaces/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

}
