import { Component, OnInit } from '@angular/core';
import { EventEntity } from '../../api/models/event-entity';
import { EventsService } from '../../api/services/events.service';
import { ApiService } from '../../api-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

export type EventFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  firstView = true;
  events: EventEntity[] = [];
  isLoading = true;
  rawCurrentEvent: EventEntity;
  currentEvent: EventEntity;
  formMode: EventFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentEvent = this.generateNewEvent();
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('/business-domains/events/list'); }
    try {
      this.events = await this.eventsService.ApiEventsGet().toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to get events');
    }
    if (this.events.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewEvent() {
    this.currentEvent = this.generateNewEvent();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectEvent(event) {
    this.rawCurrentEvent = {...event};
    this.currentEvent = event;
    this.formMode = 'Edit';
  }

  cancelNewEditEvent() {
    const currentEventIndex = this.events.findIndex(e => e.id === this.currentEvent.id);
    this.events[currentEventIndex] = this.rawCurrentEvent;
    this.currentEvent = this.generateNewEvent();
    this.formMode = 'NotSelected';
  }

  async saveEvent() {
    if (this.formMode === 'New') {
      const newEvent = {...this.currentEvent};
      this.events.push(newEvent);
      this.currentEvent = newEvent;
      this.formMode = 'NotSelected';
      this.rawCurrentEvent =  {...newEvent};
      try {
        await this.createEvent(newEvent);
        this.notifications.success('Created', 'Event Created');
        this.events = await this.eventsService.ApiEventsGet().toPromise();
      } catch (error) {
        this.notifications.error('Error', 'Error creating new event');
      }
    } else if (this.formMode === 'Edit') {
      this.rawCurrentEvent =  {...this.currentEvent};
      try {
        await this.updateEvent();
        this.notifications.success('Saved', `Event Saved`);
      } catch (error) {
        this.notifications.error('Error', 'Error saving new event');
      }
    }
  }

  createEvent = async (event) => await this.eventsService.ApiEventsPost(event)
    .toPromise()

  updateEvent = async () => await this.eventsService
    .ApiEventsByIdPut({ entity: this.currentEvent, id: this.currentEvent.id })
    .toPromise()

  async deleteEvent() {
    let eventToBeDeleted = this.events.find(e => e.id === this.currentEvent.id);
    eventToBeDeleted = {...eventToBeDeleted};
    this.events = this.events.filter(e => e.id !== this.currentEvent.id);
    this.currentEvent = this.generateNewEvent();
    this.formMode = 'NotSelected';

    try {
      await this.eventsService.ApiEventsByIdDelete(eventToBeDeleted.id).toPromise();
      this.notifications.success('Deleted', `Event Deleted`);
    } catch (err) {
      this.events.push(eventToBeDeleted);
      this.notifications.error('Delete Error', 'Error deleting event');
    }
  }

  private generateNewEvent(): EventEntity {
    const event = {} as EventEntity;
    return event;
  }
}
