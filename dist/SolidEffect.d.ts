import { ColorHSV } from '@manganese/palette-kit-core';
import { Context, SolidEffectConfiguration } from './types';
import Effect from './Effect';
import Device from './Device';
export default class SolidEffect extends Effect<SolidEffectConfiguration> {
    private color;
    constructor(configuration: SolidEffectConfiguration, context: Context);
    initialize(): Promise<void>;
    getNativeEffectForDevice(_device: Device): {
        version: "2.0";
        animName: string;
        animType: "plugin";
        colorType: "HSB";
        palette: import("./types").NativeEffectColor[];
        pluginType: "color";
        pluginUuid: string;
        pluginOptions: import("./types/effects/native/NativeEffectOption").default[];
        hasOverlay: false;
    };
    getColors(): import("./types/effects/solid-effect/SolidEffectColorConfiguration").default[];
    setColor(_colorId: string, color: ColorHSV): void;
}
