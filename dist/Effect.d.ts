/// <reference types="node" />
import { ColorHSV } from '@manganese/palette-kit-core';
import EventEmitter from 'events';
import { Context, EffectConfigurationBase, NativeEffect, ConstantEffectColorConfiguration, DynamicEffectColorConfiguration, RemoteEffectColorConfiguration } from './types';
import Device from './Device';
export default abstract class Effect<EffectConfigurationType extends EffectConfigurationBase> extends EventEmitter {
    protected readonly configuration: EffectConfigurationType;
    protected readonly context: Context;
    protected enabled: boolean;
    constructor(configuration: EffectConfigurationType, context: Context);
    initialize(): Promise<void>;
    get id(): string;
    get name(): string;
    protected get nativeEffectBase(): Partial<NativeEffect>;
    protected handleChange(): void;
    abstract getNativeEffectForDevice(device: Device): NativeEffect;
    abstract getColors(): Array<ConstantEffectColorConfiguration | DynamicEffectColorConfiguration | RemoteEffectColorConfiguration>;
    abstract setColor(colorId: string, color: ColorHSV): any;
    getDynamicColors(): DynamicEffectColorConfiguration[];
    getRemoteColors(): RemoteEffectColorConfiguration[];
    hasColor(colorId: string): boolean;
}
