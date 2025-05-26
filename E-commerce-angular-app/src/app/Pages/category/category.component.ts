import { Component } from '@angular/core';
import { CategoryService } from '../../Core/service/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  constructor(private _categoryService: CategoryService){}

  allCategory: string[] = [];

  ngOnInit(): void {
    this.displayAllCategory();
  }

  displayAllCategory() {
    this._categoryService.getAllCategory().subscribe( (next) => {
      this.allCategory = next.categories;
    })
  }

  getImageCategory(type: string): string {
    return `assets/${type}.jpg`;
  }

}
