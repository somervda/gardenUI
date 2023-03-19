import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RelayService } from '../services/relay.service';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css'],
})
export class GardenComponent implements OnInit {
  // relay settings
  pump = 'off';
  constructor(private relayService: RelayService) {}

  ngOnInit(): void {
    // Set the initial value of the pump
    this.relayService.pumpState().subscribe((response) => {
      this.pump = JSON.parse(JSON.stringify(response)).pump;
      console.log('init:', this.pump);
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
