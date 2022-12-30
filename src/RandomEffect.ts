import {
  ColorHSV,
  colorToColorHSV,
  ColorType as CoreColorType,
} from '@manganese/palette-kit-core';
import { ClientColorType } from '@manganese/palette-kit-client';

import {
  Context,
  RandomEffectConfiguration,
  EffectColorConfiguration,
  ConstantEffectColorConfiguration,
  DynamicEffectColorConfiguration,
  RemoteEffectColorConfiguration,
  NativeEffectType,
  NativeEffectOption,
} from './types';
import { NATIVE_EFFECT_BASE } from './constants';
import {
  colorToNanoleafColor,
  nativeEffectTypeToPluginUuid,
} from './utilities';
import Effect from './Effect';
import Device from './Device';

export default class RandomEffect extends Effect<RandomEffectConfiguration> {
  private colors = new Map<string /* color ID */, ColorHSV>();

  constructor(configuration: RandomEffectConfiguration, context: Context) {
    super(configuration, context);
  }

  public async initialize() {}

  private getColor(colorConfiguration: EffectColorConfiguration) {
    switch (colorConfiguration.type) {
      case CoreColorType.Constant:
        return (colorConfiguration as ConstantEffectColorConfiguration).color;
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

  public getNativeEffectForDevice(_device: Device) {
    return {
      ...NATIVE_EFFECT_BASE,
      ...this.nativeEffectBase,
      pluginUuid: nativeEffectTypeToPluginUuid(NativeEffectType.Random),
      pluginOptions: [
        {
          name: 'delayTime',
          value: this.configuration.delayTime,
        } as NativeEffectOption,
        {
          name: 'transTime',
          value: this.configuration.transitionTime,
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
