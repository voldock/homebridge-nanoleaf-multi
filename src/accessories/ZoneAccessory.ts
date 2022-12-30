import { SelectionAccessory } from 'helpers-for-homebridge';
import { Context } from '../types';
import Zone from '../Zone';

export default class ZoneAccessory extends SelectionAccessory {
  constructor(private readonly zone: Zone, context: Context) {
    super(
      {
        name: zone.name,
        options: zone.configuration.effects.map((effectConfiguration) => {
          return {
            name: effectConfiguration.name,
            id: effectConfiguration.id,
            hapIdentifier: effectConfiguration.hapIdentifier,
          };
        }),
      },
      context
    );

    this.activeOptionId = this.configuration.options[0].id;
  }

  private active: boolean = false;
  private activeOptionId: string;

  protected override async getActiveOptionId() {
    return this.activeOptionId;
  }

  protected override async setActiveOptionId(effectId: string) {
    this.activeOptionId = effectId;

    await this.zone.setActiveEffectById(effectId);
  }

  protected override async getActive() {
    return this.active;
  }

  protected override async setActive(active: boolean) {
    this.active = active;

    await this.zone.setActive(active);
  }
}
