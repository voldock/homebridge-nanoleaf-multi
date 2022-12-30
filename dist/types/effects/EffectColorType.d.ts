import { ClientColorType } from '@manganese/palette-kit-client';
declare enum NativeColorType {
    Native = "native"
}
type EffectColorType = ClientColorType | NativeColorType;
export default EffectColorType;
