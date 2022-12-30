import { SelectionAccessory } from 'helpers-for-homebridge';
import { Context } from '../types';
import Zone from '../Zone';
export default class ZoneAccessory extends SelectionAccessory {
    private readonly zone;
    constructor(zone: Zone, context: Context);
    private active;
    private activeOptionId;
    protected getActiveOptionId(): Promise<string>;
    protected setActiveOptionId(effectId: string): Promise<void>;
    protected getActive(): Promise<boolean>;
    protected setActive(active: boolean): Promise<void>;
}
