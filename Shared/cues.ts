import {BeatToColor} from '../Edt-Sledt/src/presets/converters/color/beatToColor'
import {ICue} from './types';
import {Actions} from './actions';
import {DrumToBeat} from '../Edt-Sledt/src/presets/converters/drums/drumToBeat';
import {DrumNotes} from '../Edt-Sledt/src/inputs/music-triggers';

export const presetCues: ICue[] = [
    {
        label: 'DrumKick -> ColorChanges',
        actions: [
            Actions.presetChange({
                preset: new DrumToBeat().note,
                modifier: DrumNotes._1,
                state: true,
            }),
            Actions.presetChange({
                preset: new BeatToColor().note,
                modifier: 127,
                state: true,
            }),
        ],
    }
];
