import EffectConfigurationBase from '../EffectConfigurationBase';
import EffectType from '../EffectType';
import SolidEffectColorConfiguration from './SolidEffectColorConfiguration';

export default interface SolidEffectConfiguration
  extends EffectConfigurationBase {
  type: EffectType.Solid;
  color: SolidEffectColorConfiguration;
}
