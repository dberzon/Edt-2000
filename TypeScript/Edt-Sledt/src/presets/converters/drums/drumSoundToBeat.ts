import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions/actions';
import { filter } from 'rxjs/operators';
import { modifiers } from '../../../../config/modifiers';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class DrumSoundToBeat extends PresetLogic {
    modifierOptions = {
        select: modifiers.drumSounds,
        group: [
            ModifierGroup.Drums,
            ModifierGroup.Beat,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainDrumSound
                .pipe(filter(drum => drum === this.modifier))
                .subscribe(beat => {
                    nextActionFromMsg(Actions.mainBeat(beat));
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
