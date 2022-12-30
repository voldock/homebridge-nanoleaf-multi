import DynamicEffectColorConfiguration from '../DynamicEffectColorConfiguration';
import RemoteEffectColorConfiguration from '../RemoteEffectColorConfiguration';

type SolidEffectColorConfiguration =
  | DynamicEffectColorConfiguration
  | RemoteEffectColorConfiguration;

export default SolidEffectColorConfiguration;
