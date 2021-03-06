import { Inject, Injectable } from '@angular/core';
import { Actions, nextActionFromMsg } from '../../../Shared/actions/actions';
import { VidtPresets } from '../../../Shared/vidt-presets';
import { ContentGroup, ICue } from '../../../Shared/actions/types';
import { IColor } from '../../../Shared/colors/types';
import { AnimationTypes } from '../../../Shared/vidt/animation';
import io from 'socket.io-client';
import { WINDOW } from './window.token';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket;

  constructor(
    @Inject(WINDOW) private window: Window,
  ) {
    // We use the hostname,
    this.socket = io(`http://${window.location.hostname}:${8898}/control`, {
      transports: ['websocket'],
    });
    this.socket.on('toControl', (msg) => {
      nextActionFromMsg(msg);
    });
  }

  sendVidtPreset(preset: string) {
    this.toSledt(Actions.prepareVidt(VidtPresets[preset]));
  }

  sendBeat() {
    this.toSledt(Actions.mainBeat(127));
  }

  sendPhotoAsset(asset: string) {
    this.toSledt(Actions.imageSrc(asset));
  }

  sendVideoAsset(asset: string) {
    this.toSledt(Actions.videoSrc(asset));
  }

  sendText(main: string) {
    this.toSledt(Actions.mainText(main));
  }

  sendContentGroup(group: ContentGroup) {
    this.toSledt(Actions.contentGroup(group));
  }

  sendGlitchIntensity(intensity: number) {
    this.toSledt(Actions.glitchIntensity(intensity));
  }

  sendAnimation(animation: AnimationTypes) {
    this.toSledt(Actions.animationType(animation));
  }

  activateCue(cue: ICue) {
    cue.actions.forEach(action => this.toSledt(action));
  }

  changePreset(preset, state, modifier = 127) {
    this.toSledt(Actions.presetChange({ preset, state, modifier }));
  }

  sendColor(color: IColor) {
    this.toSledt(Actions.singleColor(color));
  }

  sendMultiColor(colors: IColor[]) {
    this.toSledt(Actions.multiColor(colors));
  }

  sendColorPalette(colors: IColor[]) {
    this.toSledt(Actions.colorPalette(colors));
  }

  private toSledt(message: Actions) {
    this.socket.emit('fromControl', message);
  }
}
