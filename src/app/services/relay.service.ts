import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelayService {
  constructor(private http: HttpClient) {}

  pumpOn() {
    console.log('Pump/on');
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/pump/on'
    );
    console.log(value);
    return value;
  }

  pumpOff() {
    console.log('Pump/off');
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/pump/off'
    );
    console.log(value);
    return value;
  }

  pumpState() {
    let value = this.http.get('http://' + environment.gardenHost + '/pump');
    console.log('pump:', value);
    return value;
  }

  camOn() {
    console.log('cam/on');
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/cam/on'
    );
    console.log(value);
    return value;
  }

  camOff() {
    console.log('cam/off');
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/cam/off'
    );
    console.log(value);
    return value;
  }

  camState() {
    let value = this.http.get('http://' + environment.gardenHost + '/cam');
    console.log('cam:', value);
    return value;
  }
}
