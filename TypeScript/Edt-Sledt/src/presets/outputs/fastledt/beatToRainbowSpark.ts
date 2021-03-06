import { PresetLogic } from '../../presets-logic';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { FastLedtRainbowSpark } from '../../../outputs/edt-fastled';
import { modifiers } from '../../../../config/modifiers';
import { withLatestFrom } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/actions/types';

export class BeatToRainbowSpark extends PresetLogic {
    modifierOptions = {
        select: modifiers.fadeSpeeds,
        group: [
            ModifierGroup.FastLED,
            ModifierGroup.Beat,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.mainBeat
                .pipe(withLatestFrom(Actions$.singleColor))
                .subscribe(([, color]) => {
                    FastLedtRainbowSpark(0, this.modifier, color.h, 127);
                }),
        );
    }

    protected _stopPreset(): void {
    }
}
