import NativeEffectColor from './NativeEffectColor';
import NativeEffectOption from './NativeEffectOption';

export default interface NativeEffect {
  version: '2.0';
  animName: string;
  animType: 'plugin';
  colorType: 'HSB';
  palette: NativeEffectColor[];
  pluginType: 'color';
  pluginUuid: string;
  pluginOptions: NativeEffectOption[];
  hasOverlay: false;
}
