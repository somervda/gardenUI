import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RelayService } from '../services/relay.service';
import { SensorService } from '../services/sensor.service';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css'],
})
export class GardenComponent implements OnInit {
  pump = 'off';
  sensors = '';
  timeIterval: Subscription | undefined;

  constructor(
    private relayService: RelayService,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    // Set up polling for sensors
    this.timeIterval = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.sensorService.getSensors())
      )
      .subscribe((response) => {
        this.sensors = JSON.parse(JSON.stringify(response)).sensors;
      });
  }

  public onPumpToggle(event: MatSlideToggleChange) {
    console.log('Pump', event.checked);
    if (event.checked) {
      this.relayService.pumpOn().subscribe((response) => {
        this.pump = JSON.parse(JSON.stringify(response)).pump;
      });
    } else {
      this.relayService.pumpOff().subscribe((response) => {
        this.pump = JSON.parse(JSON.stringify(response)).pump;
      });
    }
  }

  public onCameraToggle(event: MatSlideToggleChange) {
    console.log('Camera', event.checked);
  }
}
