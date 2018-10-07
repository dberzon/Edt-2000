import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Actions, nextActionFromMsg} from '../../../Shared/actions';
import {IPhotoAsset, IVideoAsset} from "../../../Shared/assets";
import {animationTypes} from "../../../Shared/vidt-presets";
import {ICue} from "../../../Shared/types";
import {IColor} from "../../../Shared/socket";

@Injectable()
export class SocketService {
  constructor(private socket: Socket) {
    socket.on('toControl', nextActionFromMsg);
  }

  private toSledt(message: Actions) {
    this.socket.emit('fromControl', message);
  }

  sendBeat() {
    this.toSledt(Actions.mainBeat(127));
  }

  sendPhotoAsset(asset: IPhotoAsset) {
    this.toSledt(Actions.imageSrc(asset));
  }

  sendVideoAsset(asset: IVideoAsset) {
    this.toSledt(Actions.videoSrc(asset));
  }

  sendVidtPreset({preset}) {
    this.toSledt(Actions.prepareVidt(preset));
  }

  sendText(main: string) {
    this.toSledt(Actions.mainText(main));
  }

  sendWordset(set: string[]) {
    this.toSledt(Actions.wordSet(set));
  }


  sendAnimation(animation: animationTypes) {
    this.toSledt(Actions.animationType(animation));
  }

  activateCue(cue: ICue) {
    cue.actions.forEach(action => this.toSledt(action));
  }

  changePreset(preset, state, modifier = 127) {
    this.toSledt(Actions.presetChange({preset, state, modifier}));
  }

  sendColor(color: IColor) {
    this.toSledt(Actions.singleColor(color))
  }

  sendMultiColor(colors: IColor[]) {
    this.toSledt(Actions.multiColor(colors));
  }
}
