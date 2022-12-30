import {
  Context,
  ZoneConfiguration,
  EffectType,
  EffectConfiguration,
  EffectConfigurationBase,
  SolidEffectConfiguration,
  WaveEffectConfiguration,
  RandomEffectConfiguration,
} from './types';
import { EFFECT_CHANGE_EVENT } from './constants';

import Device from './Device';
import Effect from './Effect';
import SolidEffect from './SolidEffect';
import WaveEffect from './WaveEffect';
import RandomEffect from './RandomEffect';

export default class Zone {
  public readonly configuration: ZoneConfiguration;
  private context: Context;

  constructor(configuration: ZoneConfiguration, context: Context) {
    this.configuration = configuration;
    this.context = context;

    configuration.devices.forEach((deviceConfiguration) => {
      const device = new Device(deviceConfiguration, context);

      this.devices.add(device);
    });

    this.configuration.effects?.forEach((effectConfiguration) => {
      const effect = this.createEffect(effectConfiguration);
      effect.on(EFFECT_CHANGE_EVENT, () => {
        if (this.activeEffectId !== effect.id) return;

        // TODO log

        this.setActiveEffect(effect);
      });

      this.effects.set(effect.id, effect);
    });
  }

  public get name() {
    return this.configuration.name;
  }

  public get id() {
    return this.configuration.id;
  }

  public createEffect(configuration: EffectConfiguration) {
    switch (configuration.type) {
      case EffectType.Solid:
        return new SolidEffect(
          configuration as SolidEffectConfiguration,
          this.context
        );
      case EffectType.Wave:
        return new WaveEffect(
          configuration as WaveEffectConfiguration,
          this.context
        );
      case EffectType.Random:
        return new RandomEffect(
          configuration as RandomEffectConfiguration,
          this.context
        );
    }
  }

  // Initialization
  public async initialize() {
    await Promise.all(
      this.devicesArray.map(async (device) => {
        try {
          await device.initialize();
        } catch (error) {
          this.context.log.error(
            `Failed to initialize device <${device.name}>`,
            error
          );
        }
      })
    );
  }

  // Devices
  private devices = new Set<Device>();

  private get devicesArray() {
    return Array.from(this.devices);
  }

  public async setActive(active: boolean) {
    await Promise.all(
      this.devicesArray.map(async (device) => {
        await device.setActive(active);
      })
    );
  }

  // Effects
  private effects = new Map<string, Effect<any>>();
  private activeEffectId: string;

  public getEffects() {
    return this.effects;
  }

  public getEffect<T extends Effect<any> = Effect<EffectConfigurationBase>>(
    effectId: string
  ): T | null {
    const effect = this.effects.get(effectId);

    return (effect as T) || null;
  }

  public get activeEffect() {
    return this.getEffect(this.activeEffectId);
  }

  public getDefaultActiveEffectId() {
    if (this.effects.size === 0) {
      return null;
    }

    return Array.from(this.effects.values())[0].id;
  }

  public async setActiveEffectById(effectId: string) {
    this.activeEffectId = effectId;

    await this.setActiveEffect(this.activeEffect);
  }

  public async setActiveEffect(effect: Effect<any>) {
    await Promise.all(
      Array.from(this.devices).map((device) => {
        device.setActiveEffect(effect);
      })
    );
  }

  public getActiveEffectId() {
    return this.activeEffectId;
  }
}
