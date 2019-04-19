import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DisplayNotificationService } from '../display.notification';
import { Switch } from '../switch';
import { SwitchService } from '../switch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  switches: Switch[] = [];
  // Get current Year;
  currentdate = new Date().getFullYear();

  constructor(private switchService: SwitchService,
    private displayNotificationService: DisplayNotificationService) { }

  ngOnInit() {
    this.getSwitches();
  }

  getSwitches(): void {
    this.switchService.getSwitchesStatus()
      .subscribe(switches => {
        this.switches = switches;

        // check last value and set on status
        this.switches.map(s => {
          if (s.last_value === '1') {
            s.isOn = true;
          } else {
            s.isOn = false;
          }
          s.name = s.name.split('Off')[1].toUpperCase();
        });
      });
  }

  changeSwitchStatus(s: Switch): void {
    let switchStatus = false;
    let updatedValue = '0';

    if (s.last_value === '0') {
      switchStatus = true;
      updatedValue = '1';
      this.switchService.changeSwitchStatus(s.name.toLowerCase(), '1').subscribe(resp => {
        console.log(resp);
      });
    } else {
      switchStatus = false;
      updatedValue = '0';
      this.switchService.changeSwitchStatus(s.name.toLowerCase(), '0').subscribe(resp => {
        console.log(resp);
      });
    }

    this.switches.map(s1 => {
      if (s1.name === s.name) {
        s1.isOn = switchStatus;
        s1.last_value = updatedValue;
      }
    });

    this.displayNotificationService.showToastNotification(s.name + ' TURNED ' + (s.isOn ? 'ON' : 'OFF') + ' !!!', 'success');
  }

  addSwitch(): void {
    let dummySwitches = 1;

    this.switches.map(s => {
      if (s.key === 'A') {
        dummySwitches = dummySwitches + 1;
      }
    });

    const s1 = new Switch();
    s1.key = 'A';
    s1.last_value = '0';
    s1.name = 'DUMMY ' + dummySwitches;
    s1.isOn = false;

    this.switches.push(s1);

    this.displayNotificationService.showToastNotification('New switch added successfully!!!', 'success');
  }
}
