import { PresetLogic } from '../../presets-logic';
import { Actions, Actions$, nextActionFromMsg } from '../../../../../Shared/actions';
import { ModifierGroup } from '../../../../../Shared/helpers/types';

export class MultiColorToVidtMultiColor extends PresetLogic {
    modifierOptions = {
        group: [
            ModifierGroup.Vidt,
            ModifierGroup.Color,
        ],
    };

    protected _startPreset(): void {
        this.addSub(
            Actions$.multiColor.subscribe(color => {
                nextActionFromMsg(Actions.vidtMultiColor(color));
            }),
        );
    }

    protected _stopPreset(): void {
    }
}
