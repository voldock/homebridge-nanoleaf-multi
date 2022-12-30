import EffectConfigurationBase from '../EffectConfigurationBase';
import EffectType from '../EffectType';
import EffectColorConfiguration from '../EffectColorConfiguration';

export default interface RandomEffectConfiguration
  extends EffectConfigurationBase {
  type: EffectType.Random;
  delayTime: number;
  transitionTime: number;
  colors: EffectColorConfiguration[];
}
