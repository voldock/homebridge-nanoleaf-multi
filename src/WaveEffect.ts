import {
  ColorHSV,
  colorToColorHSV,
  ColorType as CoreColorType,
} from '@manganese/palette-kit-core';
import { ClientColorType } from '@manganese/palette-kit-client';

import {
  Context,
  WaveEffectConfiguration,
  EffectColorConfiguration,
  ConstantEffectColorConfiguration,
  DynamicEffectColorConfiguration,
  RemoteEffectColorConfiguration,
  NativeEffectType,
  NativeEffectOption,
} from './types';
import { EFFECT_SPEED_COEFFICIENT, NATIVE_EFFECT_BASE } from './constants';
import {
  colorToNanoleafColor,
  nativeEffectTypeToPluginUuid,
} from './utilities';
import Effect from './Effect';
import Device from './Device';

export default class WaveEffect extends Effect<WaveEffectConfiguration> {
  private colors = new Map<string /* color ID */, ColorHSV>();

  constructor(configuration: WaveEffectConfiguration, context: Context) {
    super(configuration, context);
  }

  public async initialize() {}

  private getColor(colorConfiguration: EffectColorConfiguration) {
    switch (colorConfiguration.type) {
      case CoreColorType.Constant:
        return colorToColorHSV(
          (colorConfiguration as ConstantEffectColorConfiguration).color
        );
      case CoreColorType.Dynamic:
      case ClientColorType.Remote:
        return this.colors.get(
          (
            colorConfiguration as
              | DynamicEffectColorConfiguration
              | RemoteEffectColorConfiguration
          ).id
        );
    }
  }

  public getNativeEffectForDevice(device: Device) {
    const colorsPerFrame =
      1 + Math.ceil(device.size / this.configuration.colorSize);

    return {
      ...NATIVE_EFFECT_BASE,
      ...this.nativeEffectBase,
      pluginUuid: nativeEffectTypeToPluginUuid(NativeEffectType.Wheel),
      pluginOptions: [
        {
          name: 'linDirection',
          value: this.configuration.direction,
        } as NativeEffectOption,
        {
          name: 'loop',
          value: true,
        } as NativeEffectOption,
        {
          name: 'nColorsPerFrame',
          value: colorsPerFrame,
        } as NativeEffectOption,
        {
          name: 'transTime',
          value: this.configuration.transitionTime / colorsPerFrame,
        } as NativeEffectOption,
      ],
      palette: this.configuration.colors.map((colorConfiguration) => {
        const color = this.getColor(colorConfiguration);

        return colorToNanoleafColor(color, colorConfiguration.probability);
      }),
    };
  }

  public getColors() {
    return this.configuration.colors;
  }

  public setColor(colorId: string, color: ColorHSV) {
    this.colors.set(colorId, color);
    this.handleChange();
  }
}
