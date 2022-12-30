import {
  ColorHSV,
  ColorType as CoreColorType,
} from '@manganese/palette-kit-core';
import { ClientColorType } from '@manganese/palette-kit-client';

import EventEmitter from 'events';
import {
  Context,
  EffectConfigurationBase,
  NativeEffect,
  ConstantEffectColorConfiguration,
  DynamicEffectColorConfiguration,
  RemoteEffectColorConfiguration,
} from './types';
import { DEFAULT_NATIVE_EFFECT_NAME, EFFECT_CHANGE_EVENT } from './constants';
import Device from './Device';

export default abstract class Effect<
  EffectConfigurationType extends EffectConfigurationBase
> extends EventEmitter {
  protected enabled: boolean;

  constructor(
    protected readonly configuration: EffectConfigurationType,
    protected readonly context: Context
  ) {
    super();
  }

  public async initialize() {}

  public get id() {
    return this.configuration.id;
  }

  public get name() {
    return this.configuration.name;
  }

  protected get nativeEffectBase(): Partial<NativeEffect> {
    return {
      animName: this.configuration.nativeName || DEFAULT_NATIVE_EFFECT_NAME,
    };
  }

  protected handleChange() {
    this.emit(EFFECT_CHANGE_EVENT);
  }

  public abstract getNativeEffectForDevice(device: Device): NativeEffect;

  public abstract getColors(): Array<
    | ConstantEffectColorConfiguration
    | DynamicEffectColorConfiguration
    | RemoteEffectColorConfiguration
  >;

  public abstract setColor(colorId: string, color: ColorHSV);

  public getDynamicColors(): DynamicEffectColorConfiguration[] {
    return this.getColors().filter(
      (colorConfiguration) => colorConfiguration.type === CoreColorType.Dynamic
    ) as DynamicEffectColorConfiguration[];
  }

  public getRemoteColors(): RemoteEffectColorConfiguration[] {
    return this.getColors().filter(
      (colorConfiguration) => colorConfiguration.type === ClientColorType.Remote
    ) as RemoteEffectColorConfiguration[];
  }

  public hasColor(colorId: string) {
    return [...this.getDynamicColors(), ...this.getRemoteColors()].some(
      (colorConfiguration) => {
        return colorConfiguration.id === colorId;
      }
    );
  }
}
