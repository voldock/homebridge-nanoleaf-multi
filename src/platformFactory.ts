import { createSimpleLogger, Logger } from 'simple-node-logger';
import { HomebridgeLogAppender } from 'helpers-for-homebridge';
import { Palette } from '@manganese/palette-kit-core';
import { PaletteClient } from '@manganese/palette-kit-client';

import { PlatformConfiguration, Context } from './types';
import { DynamicEffectColorAccessory, ZoneAccessory } from './accessories';
import Zone from './Zone';

export default (homebridge: any) => {
  class Platform {
    context: Context;
    zones = new Map<string /* zone ID */, Zone>();

    get allEffects() {
      return Array.from(this.zones.values()).flatMap((zone) =>
        Array.from(zone.getEffects().values())
      );
    }

    constructor(homebridgeLog, readonly configuration: PlatformConfiguration) {
      const log = createSimpleLogger({
        loggers: [
          new Logger({
            appenders: [new HomebridgeLogAppender(homebridgeLog)],
          }),
        ],
      });

      const palette = new Palette({}, { log });
      palette.onAnyColorChange((event) => {
        this.allEffects.forEach((effect) => {
          if (!effect.hasColor(event.colorId)) return;

          effect.setColor(event.colorId, event.colorHsv);
        });
      });

      const paletteClient = new PaletteClient(
        configuration.paletteClient,
        {
          log,
        },
        palette
      );

      this.context = {
        homebridge,
        log,
        palette,
        paletteClient,
      };

      this.configuration.zones.forEach((zoneConfiguration) => {
        const zone = new Zone(zoneConfiguration, this.context);

        this.zones.set(zoneConfiguration.id, zone);
      });
    }

    public async accessories(callback) {
      await this.context.paletteClient.connect();

      const zoneAccessories = await Promise.all(
        Array.from(this.zones.values()).map(async (zone) => {
          await zone.initialize();

          return new ZoneAccessory(zone, this.context);
        })
      );

      const effectAccessories = this.allEffects.flatMap((effect) => {
        return effect.getDynamicColors().map((colorConfiguration) => {
          return new DynamicEffectColorAccessory(
            colorConfiguration,
            this.context
          );
        });
      });

      const accessories = [...zoneAccessories, ...effectAccessories];

      callback(accessories);
    }
  }

  return Platform;
};
