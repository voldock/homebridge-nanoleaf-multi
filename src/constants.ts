import { ColorHSV, ColorSpace } from '@manganese/palette-kit-core';
import { NativeEffect, NativeEffectType } from './types';

export const OFF_COLOR: ColorHSV = {
  space: ColorSpace.HSV,
  hue: 0,
  saturation: 0,
  value: 0,
};
export const DEFAULT_DEVICE_SIZE = 50;
export const EFFECT_CHANGE_EVENT = 'change';
export const EFFECT_SPEED_COEFFICIENT = 300;
export const DEFAULT_NATIVE_EFFECT_NAME = 'Dynamic Effect';
export const NATIVE_EFFECT_TYPE_UUIDS = new Map<NativeEffectType, string>([
  [NativeEffectType.Wheel, '6970681a-20b5-4c5e-8813-bdaebc4ee4fa'],
  [NativeEffectType.Flow, '027842e4-e1d6-4a4c-a731-be74a1ebd4cf'],
  [NativeEffectType.Explode, '713518c1-d560-47db-8991-de780af71d1e'],
  [NativeEffectType.Fade, 'b3fd723a-aae8-4c99-bf2b-087159e0ef53'],
  [NativeEffectType.Random, 'ba632d3e-9c2b-4413-a965-510c839b3f71'],
  [NativeEffectType.Highlight, '70b7c636-6bf8-491f-89c1-f4103508d642'],
]);
export const NATIVE_EFFECT_BASE: NativeEffect = {
  version: '2.0',
  animName: DEFAULT_NATIVE_EFFECT_NAME,
  animType: 'plugin',
  colorType: 'HSB',
  palette: [],
  pluginType: 'color',
  pluginUuid: NATIVE_EFFECT_TYPE_UUIDS.get(NativeEffectType.Fade),
  pluginOptions: [],
  hasOverlay: false,
};
