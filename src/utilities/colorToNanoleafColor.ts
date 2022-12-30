import { Color, colorToColorHSV } from '@manganese/palette-kit-core';

import { NativeEffectColor } from '../types';

export default (color: Color, probability: number = 0): NativeEffectColor => {
  const colorHsv = colorToColorHSV(color);

  return {
    hue: Math.round(colorHsv.hue * 360),
    saturation: Math.round(colorHsv.saturation * 100),
    brightness: Math.round(colorHsv.value * 100),
    probability,
  };
};
