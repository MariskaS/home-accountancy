import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';

import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from '../../shared/services/categories.services';
import { HAEvent } from '../../shared/models/event.model';

@Component({
  selector: 'ha-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: HAEvent;
  category: Category;

  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.s1 = this.route.params
      .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
      .mergeMap((event: HAEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
