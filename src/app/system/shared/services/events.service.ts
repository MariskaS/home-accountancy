import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HAEvent } from '../models/event.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: HAEvent): Observable<HAEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HAEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<HAEvent> {
    return this.get(`events/${id}`);
  }
}
