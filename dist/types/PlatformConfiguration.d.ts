import { ClientConfiguration } from '@manganese/palette-kit-client';
import { ZoneConfiguration } from './devices';
export default interface PlatformConfiguration {
    paletteClient: ClientConfiguration;
    zones: ZoneConfiguration[];
}
