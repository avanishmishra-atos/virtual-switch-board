import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DisplayNotificationService } from '../display.notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent {
  constructor(private displayNotificationService: DisplayNotificationService) { }
}