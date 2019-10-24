import { filter, scan, startWith, tap } from 'rxjs/operators';
import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions';
import { getPresetState, presets } from './presets/presets';
import * as React from 'react';
import { render } from 'ink';
import { scannedContentGroups } from './media/asset-scan-dir';
import { presetCues } from './cues/cues';
import { EdtConsole } from './outputs/edt-console';
import { connectedControls$ } from './outputs/edt-control';
import { connectedVidt$ } from './outputs/edt-vidt';
import { combineLatest, merge } from 'rxjs';
import { OSCOutput$ } from './communication/osc';
import { midiPresetChange$ } from './communication/midi';
import { sendMidiPresetChange } from './automation/presets';

const {rerender} = render(<></>);

merge(
    midiPresetChange$,
    // only send MIDI on actions, not on midi input; otherwise endless loop!
    Actions$.presetChange.pipe(tap(sendMidiPresetChange)),
).pipe(
    filter(msg => presets[msg.preset]),
    tap(({modifier, preset, state}) => {
        if (state) {
            presets[preset].startPreset(modifier);
        } else {
            presets[preset].stopPreset();
        }
    }),
).subscribe();

combineLatest(
    [
        connectedVidt$,
        connectedControls$,
        Actions$.presetState,
        OSCOutput$.pipe(
            startWith(''),
            scan((mostRecent: string[], current) => [...mostRecent, current].slice(-9), []),
        ),
    ],
).pipe(
    tap(([vidts, controls, presetState, OSCOutput]) => {
        rerender(<EdtConsole vidts={vidts} controls={controls} presetState={presetState} OSCOutput={OSCOutput}/>);
    }),
).subscribe();

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.contentGroups(scannedContentGroups));
