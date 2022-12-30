import { Context, DeviceConfiguration, NativeEffect } from './types';
import Effect from './Effect';
export default class Device {
    private readonly configuration;
    private readonly context;
    private initialized;
    private nativeDevice;
    private lock;
    constructor(configuration: DeviceConfiguration, context: Context);
    get name(): string;
    get size(): number;
    initialize(): Promise<void>;
    private withWriteLock;
    setActive(active: boolean): Promise<void>;
    setActiveEffect(effect: Effect<any>): Promise<void>;
    addNativeEffect(nativeEffect: NativeEffect): Promise<void>;
}
