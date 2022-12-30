import DeviceConfiguration from './DeviceConfiguration';
import EffectConfiguration from '../effects/EffectConfiguration';

export default interface ZoneConfiguration {
  id: string;
  name: string;
  devices: DeviceConfiguration[];
  effects: EffectConfiguration[];
}
