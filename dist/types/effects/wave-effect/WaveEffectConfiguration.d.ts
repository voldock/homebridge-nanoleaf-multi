import EffectConfigurationBase from '../EffectConfigurationBase';
import EffectType from '../EffectType';
import EffectColorConfiguration from '../EffectColorConfiguration';
import { NativeDirection } from '../native';
export default interface WaveEffectConfiguration extends EffectConfigurationBase {
    type: EffectType.Wave;
    direction: NativeDirection;
    transitionTime: number;
    colorSize: number;
    colors: EffectColorConfiguration[];
}
