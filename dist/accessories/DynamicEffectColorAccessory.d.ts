import { LocalPaletteColorAccessory } from 'helpers-for-homebridge';
import { Context, DynamicEffectColorConfiguration } from '../types';
export default class DynamicEffectColorAccessory extends LocalPaletteColorAccessory {
    constructor(colorConfiguration: DynamicEffectColorConfiguration, context: Context);
}
