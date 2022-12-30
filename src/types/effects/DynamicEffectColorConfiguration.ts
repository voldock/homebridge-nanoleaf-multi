import { DynamicColorConfiguration } from '@manganese/palette-kit-core';
import EffectColorConfigurationBase from './EffectColorConfigurationBase';

type DynamicEffectColorConfiguration<AdditionalConfigurationType = {}> =
  DynamicColorConfiguration<
    EffectColorConfigurationBase &
      AdditionalConfigurationType & {
        name: string;
      }
  >;

export default DynamicEffectColorConfiguration;
