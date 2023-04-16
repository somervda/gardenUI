import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RelayService } from '../services/relay.service';
import { SensorService } from '../services/sensor.service';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs';
import { Sensors } from '../models';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css'],
})
export class GardenComponent implements OnInit {
  sensors: Sensors = {};

  constructor(
    private relayService: RelayService,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    // Set up polling for sensors, check each 15 seconds
    interval(15000)
      .pipe(
        startWith(0),
        switchMap(() => this.sensorService.getSensors())
      )
      .subscribe((response) => {
        this.sensors = JSON.parse(JSON.stringify(response)).sensors;
        console.log('Sensors:', this.sensors);
      });
  }

  public onPumpToggle(event: MatSlideToggleChange) {
    console.log('Pump', event.checked);
    if (event.checked) {
      this.relayService.pumpOn().subscribe((response) => {
        this.sensors.pump = JSON.parse(JSON.stringify(response)).pump;
      });
    } else {
      this.relayService.pumpOff().subscribe((response) => {
        this.sensors.pump = JSON.parse(JSON.stringify(response)).pump;
      });
    }
  }

  public onCameraToggle(event: MatSlideToggleChange) {
    console.log('Camera', event.checked);
    if (event.checked) {
      this.relayService.camOn().subscribe((response) => {
        this.sensors.cam = JSON.parse(JSON.stringify(response)).cam;
      });
    } else {
      this.relayService.camOff().subscribe((response) => {
        this.sensors.cam = JSON.parse(JSON.stringify(response)).cam;
      });
    }
  }
}
