import { ClientColorType } from '@manganese/palette-kit-client';

enum NativeColorType {
  Native = 'native',
}

type EffectColorType = ClientColorType | NativeColorType;

export default EffectColorType;
