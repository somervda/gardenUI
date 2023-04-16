import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private http: HttpClient) {}

  getSensors() {
    console.log('/sensors');
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/sensors'
    );
    console.log(value);
    return value;
  }
}
