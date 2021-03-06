import { vidtSocket$ } from '../communication/sockets';
import { fromEvent } from 'rxjs/observable/fromEvent';
import * as SocketIO from 'socket.io';
import { map, take, takeUntil } from 'rxjs/operators';
import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { BehaviorSubject, merge } from 'rxjs';

export const connectedVidtSubject$ = new BehaviorSubject<string[]>([]);

vidtSocket$.subscribe(socket => {
    connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));
    });

    merge(
        Actions$.vidtMultiColor.pipe(map(Actions.vidtMultiColor)),
        Actions$.animationType.pipe(map(Actions.animationType)),
        Actions$.imageSrc.pipe(map(Actions.imageSrc)),
        Actions$.videoSrc.pipe(map(Actions.videoSrc)),
        Actions$.prepareVidt.pipe(map(Actions.prepareVidt)),
        Actions$.mainText.pipe(map(Actions.mainText)),
        Actions$.mainDrum.pipe(map(Actions.mainDrum)),
        Actions$.mainBeat.pipe(map(Actions.mainBeat)),
        Actions$.vidtSingleColor.pipe(map(Actions.vidtSingleColor)),
        Actions$.glitchIntensity.pipe(map(Actions.glitchIntensity)),
    ).pipe(
        takeUntil(disconnected$),
    ).subscribe(msg => socket.emit('toVidt', msg));
});

export const connectedVidt$ = connectedVidtSubject$.asObservable();
