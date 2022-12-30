import { ColorHSV } from '@manganese/palette-kit-core';
import { Context, WaveEffectConfiguration, EffectColorConfiguration, NativeEffectOption } from './types';
import Effect from './Effect';
import Device from './Device';
export default class WaveEffect extends Effect<WaveEffectConfiguration> {
    private colors;
    constructor(configuration: WaveEffectConfiguration, context: Context);
    initialize(): Promise<void>;
    private getColor;
    getNativeEffectForDevice(device: Device): {
        pluginUuid: string;
        pluginOptions: NativeEffectOption[];
        palette: import("./types").NativeEffectColor[];
        version: "2.0";
        animName: string;
        animType: "plugin";
        colorType: "HSB";
        pluginType: "color";
        hasOverlay: false;
    };
    getColors(): EffectColorConfiguration[];
    setColor(colorId: string, color: ColorHSV): void;
}
