import {
    DeviceIPs,
    Modii,
    OSCDevices,
} from '../../../Shared/config';
import {IColor} from '../../../Shared/socket';
import {sendToOSC} from "../communication/osc";

// Might not work yet
// export function EdtLEDSpark(instance: number, colorMsg: IColor) {
//     sendToArduino(OSCDevices.EdtFastLed, instance, [
//         Modii.SingleSpark,
//         colorMsg.h,
//         colorMsg.b,
//     ]);
// }

// Not yet working??
// export function EdtLEDRainbow(instance: number = 0, start: number, end: number, colorMsg: IColor, deltaHue: number) {
//     sendToArduino(OSCDevices.EdtFastLed, instance,[
//         Modii.RainbowSolid,
//         start,
//         end,
//         colorMsg.h,
//         deltaHue,
//     ]);
// }

export function FastLedtSingleSolid(instance: number, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtFastLed + instance.toString()], [
        Modii.SingleSolid,
        start,
        end,
        colorMsg.h,
        colorMsg.s,
        colorMsg.b,
    ]);
}

export function FastLedtSinglePulse(instance: number, duration: number, colorMsg: IColor, start: number = 0, end: number = 127) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtFastLed + instance.toString()], [
        Modii.SinglePulse,
        start,
        end,
        colorMsg.h,
        colorMsg.s,
        colorMsg.b,
        duration,
    ]);
}

export function FastLedtStrobe(instance: number, speed: number, hue: number) {
    sendToOSC(DeviceIPs.edtDispEdter, [OSCDevices.EdtFastLed + instance.toString()], [
        Modii.Strobo,
        hue,
        speed,
    ]);
}


