import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { SettingService, Settings } from '../services/setting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings$$: Subscription | undefined;

  settingsForm: FormGroup;
  // testForm: FormGroup;
  settings: Settings | undefined;

  constructor(private settingService: SettingService, private fb: FormBuilder) {
    this.settingService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.settingsForm.patchValue(this.settings);
      // console.log('this.cache:', this.cache, this.cacheForm);
    });
    this.settingsForm = this.fb.group({
      pumpOnSeconds: [
        this.settings?.pumpOnSeconds,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(500),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      camOnMinutes: [
        this.settings?.camOnMinutes,
        [
          Validators.required,
          Validators.min(5),
          Validators.max(30),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pumpMSTriggerOn: [
        this.settings?.pumpMSTriggerOn,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pumpMSBlock: [
        this.settings?.pumpMSBlock,
        [
          Validators.required,
          Validators.min(5),
          Validators.max(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pumpTimes: [
        this.settings?.pumpTimes,
        [Validators.pattern('^[0-9]{3,4}(,[0-9]{3,4})*$')],
      ],
    });
  }

  ngOnInit(): void {}

  update(): void {
    // console.log('update', this.cacheForm);
    if (this.settingsForm.invalid == false)
      for (const field in this.settingsForm.controls) {
        const control = this.settingsForm.controls[field];
        if (control.touched) {
          // console.log(field, control);
          switch (field) {
            case 'pumpOnSeconds':
              this.settingService
                .setPumpOnSeconds(control.value)
                .subscribe(() => {});
              break;
            case 'camOnMinutes':
              this.settingService
                .setCamOnMinutes(control.value)
                .subscribe(() => {});
              break;
            case 'pumpMSTriggerOn':
              this.settingService
                .setPumpMSTriggerOn(control.value)
                .subscribe(() => {});
              break;
            case 'pumpMSBlock':
              this.settingService
                .setPumpMSBlock(control.value)
                .subscribe(() => {});
              break;
            case 'pumpTimes':
              this.settingService
                .setPumpTimes(control.value)
                .subscribe(() => {});
              break;
            default:
          }
        }
      }
  }

  ngOnDestroy(): void {}
}
