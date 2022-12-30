import { RemoteColorConfiguration } from '@manganese/palette-kit-client';
import EffectColorConfigurationBase from './EffectColorConfigurationBase';
type RemoteEffectColorConfiguration<AdditionalConfigurationType = {}> = RemoteColorConfiguration<EffectColorConfigurationBase & AdditionalConfigurationType>;
export default RemoteEffectColorConfiguration;
