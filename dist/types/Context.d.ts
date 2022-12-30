import { PaletteClient } from '@manganese/palette-kit-client';
import { Palette } from '@manganese/palette-kit-core';
import SimpleLogger from 'simple-node-logger';
export default interface Context {
    homebridge: any;
    palette: Palette;
    paletteClient: PaletteClient;
    log: SimpleLogger.Logger;
}
