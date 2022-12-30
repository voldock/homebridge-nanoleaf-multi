import { ColorHSV } from '@manganese/palette-kit-core';
import { Context, RandomEffectConfiguration, EffectColorConfiguration, NativeEffectOption } from './types';
import Effect from './Effect';
import Device from './Device';
export default class RandomEffect extends Effect<RandomEffectConfiguration> {
    private colors;
    constructor(configuration: RandomEffectConfiguration, context: Context);
    initialize(): Promise<void>;
    private getColor;
    getNativeEffectForDevice(_device: Device): {
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
