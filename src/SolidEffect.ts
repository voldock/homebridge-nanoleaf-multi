import { ColorType, ColorHSV } from '@manganese/palette-kit-core';

import {
  Context,
  DynamicEffectColorConfiguration,
  SolidEffectConfiguration,
} from './types';
import { NATIVE_EFFECT_BASE } from './constants';
import Effect from './Effect';
import Device from './Device';

const DEFAULT_COLOR_ID = 'default';

export default class SolidEffect extends Effect<SolidEffectConfiguration> {
  private color: ColorHSV;

  constructor(configuration: SolidEffectConfiguration, context: Context) {
    super(configuration, context);
  }

  public async initialize() {}

  public getNativeEffectForDevice(_device: Device) {
    return {
      ...NATIVE_EFFECT_BASE,
      ...this.nativeEffectBase,
    };
  }

  public getColors() {
    return [this.configuration.color];
  }

  public setColor(_colorId: string, color: ColorHSV) {
    this.color = color;
    this.handleChange();
  }
}
