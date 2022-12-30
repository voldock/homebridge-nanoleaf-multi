import { NanoleafClient } from 'nanoleaf-client-multi';
import ReadWriteLock from 'rwlock';

import { Context, DeviceConfiguration, NativeEffect } from './types';
import { DEFAULT_DEVICE_SIZE } from './constants';
import Effect from './Effect';

export default class Device {
  private initialized = false;
  private nativeDevice: NanoleafClient;
  private lock = new ReadWriteLock();

  constructor(
    private readonly configuration: DeviceConfiguration,
    private readonly context: Context
  ) {}

  public get name() {
    return this.configuration.name;
  }

  public get size() {
    return this.configuration.size || DEFAULT_DEVICE_SIZE;
  }

  public async initialize() {
    this.nativeDevice = new NanoleafClient(
      this.configuration.ip,
      this.configuration.token
    );

    const deviceInfo = await this.nativeDevice.getInfo();

    this.context.log.info(`Initialized <${this.configuration.name}>`);
    this.initialized = true;
  }

  private async withWriteLock(callback: () => Promise<void>) {
    if (!this.initialized) {
      return Promise.reject('Device is not initialized');
    }

    return await this.lock.writeLock(async (release) => {
      try {
        await callback();
      } catch (error) {
        this.context.log.debug('Error while holding write lock', error);
      } finally {
        release();
      }
    });
  }

  public async setActive(active: boolean) {
    await this.withWriteLock(async () => {
      await this.nativeDevice.power(active);
    });
  }

  public async setActiveEffect(effect: Effect<any>) {
    await this.withWriteLock(async () => {
      const nativeEffect = effect.getNativeEffectForDevice(this);

      await this.nativeDevice.addEffect(nativeEffect);
    });
  }

  public async addNativeEffect(nativeEffect: NativeEffect) {
    await this.withWriteLock(async () => {
      await this.nativeDevice.addEffect(nativeEffect);
    });
  }
}
