import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Settings {
  pumpOnSeconds: number;
  camOnMinutes: number;
  pumpMSTriggerOn: number;
  pumpMSBlock: number;
  pumpTimes: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient) {}

  getSettings() {
    let value = this.http.get<Settings>(
      'http://' + environment.gardenHost + '/settings'
    );
    return value;
  }

  getPumpOnSeconds() {
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/pumpOnSeconds'
    );
    return value;
  }
  setPumpOnSeconds(value: number) {
    let result = this.http.get<string>(
      'http://' +
        environment.gardenHost +
        '/settings/pumpOnSeconds/' +
        value.toString()
    );
    return result;
  }
  getCamOnMinutes() {
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/camOnMinutes'
    );
    return value;
  }
  setCamOnMinutes(value: number) {
    let result = this.http.get<string>(
      'http://' +
        environment.gardenHost +
        '/settings/camOnMinutes/' +
        value.toString()
    );
    return result;
  }
  getPumpMSTriggerOn() {
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/pumpMSTriggerOn'
    );
    return value;
  }
  setPumpMSTriggerOn(value: number) {
    let result = this.http.get<string>(
      'http://' +
        environment.gardenHost +
        '/settings/pumpMSTriggerOn/' +
        value.toString()
    );
    return result;
  }

  getPumpMSBlock() {
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/pumpMSBlock'
    );
    return value;
  }

  setPumpMSBlock(value: number) {
    let result = this.http.get<string>(
      'http://' +
        environment.gardenHost +
        '/settings/pumpMSBlock/' +
        value.toString()
    );
    return result;
  }

  getPumpTimes() {
    let value = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/pumpTimes'
    );
    return value;
  }

  setPumpTimes(value: string) {
    let result = this.http.get<string>(
      'http://' + environment.gardenHost + '/settings/pumpTimes/' + value
    );
    return result;
  }
}
