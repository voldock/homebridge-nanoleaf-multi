import { RandomEffectConfiguration } from './random-effect';
import { SolidEffectConfiguration } from './solid-effect';
import { WaveEffectConfiguration } from './wave-effect';

type EffectConfiguration =
  | SolidEffectConfiguration
  | WaveEffectConfiguration
  | RandomEffectConfiguration;

export default EffectConfiguration;
