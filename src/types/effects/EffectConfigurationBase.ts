import EffectType from './EffectType';

export default interface EffectConfigurationBase {
  type: EffectType;
  name: string;
  id: string;
  nativeName?: string;
  hapIdentifier: number;
}
