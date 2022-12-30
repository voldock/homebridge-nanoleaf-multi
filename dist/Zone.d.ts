import { Context, ZoneConfiguration, EffectConfiguration, EffectConfigurationBase } from './types';
import Effect from './Effect';
import SolidEffect from './SolidEffect';
import WaveEffect from './WaveEffect';
import RandomEffect from './RandomEffect';
export default class Zone {
    readonly configuration: ZoneConfiguration;
    private context;
    constructor(configuration: ZoneConfiguration, context: Context);
    get name(): string;
    get id(): string;
    createEffect(configuration: EffectConfiguration): SolidEffect | WaveEffect | RandomEffect;
    initialize(): Promise<void>;
    private devices;
    private get devicesArray();
    setActive(active: boolean): Promise<void>;
    private effects;
    private activeEffectId;
    getEffects(): Map<string, Effect<any>>;
    getEffect<T extends Effect<any> = Effect<EffectConfigurationBase>>(effectId: string): T | null;
    get activeEffect(): Effect<EffectConfigurationBase>;
    getDefaultActiveEffectId(): string;
    setActiveEffectById(effectId: string): Promise<void>;
    setActiveEffect(effect: Effect<any>): Promise<void>;
    getActiveEffectId(): string;
}
