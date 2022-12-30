import { NativeEffectType } from '../types';
import { NATIVE_EFFECT_TYPE_UUIDS } from '../constants';

export default (type: NativeEffectType) => NATIVE_EFFECT_TYPE_UUIDS.get(type);
