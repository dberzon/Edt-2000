'use strict';
import {Subscription} from 'rxjs/Subscription';
import {sendToVidt} from '../../outputs/edt-vidt';
import {EdtMainColor} from '../../subjects/colors';
import {IEdtPreset} from '../presets';

export class EdtVidtFollowColor implements IEdtPreset {
    private vidtColorSubscription: Subscription;

    public startPreset(velocity: number): void {
        // Send the whole colorMsg to the EdtVidt where it will change IColor accordingly
        this.vidtColorSubscription = EdtMainColor.subscribe(sendToVidt);
    }

    public stopPreset(): void {
        if (typeof this.vidtColorSubscription !== 'undefined') {
            this.vidtColorSubscription.unsubscribe();
        }
    }

}
