import { noteOn$ } from '../../../inputs/midi';
import { PresetLogic } from '../../presets-logic';
import { filter, withLatestFrom } from 'rxjs/operators';
import { modifiers } from '../../../../../Shared/modifiers';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/types';

export class MidiToColors extends PresetLogic {
    modifier = modifiers.midiChannels[0].value;

    modifierOptions = {
        select: modifiers.midiChannels,
        group: ModifierGroup.Color,
    };

    protected _startPreset(): void {
        this.addSub(
            noteOn$
                .pipe(
                    filter(note => note.channel === this.modifier),
                    withLatestFrom(Actions$.multiColor),
                )
                .subscribe(([noteOn, multiColor]) => {
                    nextActionFromMsg(
                        Actions.singleColor(
                            multiColor[noteOn.note % multiColor.length],
                        ),
                    );
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
