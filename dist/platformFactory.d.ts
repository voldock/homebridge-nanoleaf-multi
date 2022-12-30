import { PlatformConfiguration, Context } from './types';
import Zone from './Zone';
declare const _default: (homebridge: any) => {
    new (homebridgeLog: any, configuration: PlatformConfiguration): {
        context: Context;
        zones: Map<string, Zone>;
        readonly allEffects: import("./Effect").default<any>[];
        readonly configuration: PlatformConfiguration;
        accessories(callback: any): Promise<void>;
    };
};
export default _default;
