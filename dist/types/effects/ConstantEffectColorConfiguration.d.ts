import { ConstantColorConfiguration } from '@manganese/palette-kit-core';
import EffectColorConfigurationBase from './EffectColorConfigurationBase';
type ConstantEffectColorConfiguration<AdditionalConfigurationType = {}> = ConstantColorConfiguration<EffectColorConfigurationBase & AdditionalConfigurationType>;
export default ConstantEffectColorConfiguration;
