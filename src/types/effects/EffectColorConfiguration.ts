import ConstantEffectColorConfiguration from './ConstantEffectColorConfiguration';
import DynamicEffectColorConfiguration from './DynamicEffectColorConfiguration';
import RemoteEffectColorConfiguration from './RemoteEffectColorConfiguration';

type EffectColorConfiguration =
  | ConstantEffectColorConfiguration
  | DynamicEffectColorConfiguration
  | RemoteEffectColorConfiguration;

export default EffectColorConfiguration;
