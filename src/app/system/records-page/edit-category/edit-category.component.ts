import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from '../../../shared/models/message.model';
import { Category } from '../../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.services';


@Component({
  selector: 'ha-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'The category has been edited successfully.';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

}
