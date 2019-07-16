import { Component, Input } from '@angular/core';
import { groupedControlPresetMsg, IControlPresetMsg } from '../../../../../Shared/types';
import { converToNamedPresetGroup } from '../../../../../Shared/modifiers';

@Component({
  selector: 'app-preset-switchers',
  template: `
    <ng-container *ngIf="groupedPresetState">
      <ul class="tab" *ngFor="let group of groupedPresetState;">
        <li class="tab__item" (click)="currentGroup = group.title">
          {{group.title}}
        </li>
      </ul>
      <div *ngFor="let group of groupedPresetState;">
        <ng-container *ngIf="currentGroup === group.title">
          <h1>{{group.title}}</h1>
          <ul class="list list--presets">
            <li class="list__item" *ngFor="let preset of group.presets">
              <app-preset-switcher [preset]="preset"></app-preset-switcher>
            </li>
          </ul>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class PresetSwitchersComponent {
  groupedPresetState: groupedControlPresetMsg[] = [];
  currentGroup: string;

  constructor() {
  }

  @Input() set presetState(presetStates: IControlPresetMsg[]) {
    this.groupedPresetState = converToNamedPresetGroup(presetStates);
    this.currentGroup = (this.groupedPresetState[0] && this.groupedPresetState[0].title) || '';
  }

}
