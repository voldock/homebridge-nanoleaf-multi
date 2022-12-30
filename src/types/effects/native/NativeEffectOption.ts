import NativeDirection from './NativeDirection';

type NativeEffectOption =
  | {
      name: 'delayTime';
      value: number;
    }
  | {
      name: 'transTime';
      value: number;
    }
  | {
      name: 'linDirection';
      value: NativeDirection;
    }
  | {
      name: 'loop';
      value: boolean;
    }
  | {
      name: 'nColorsPerFrame';
      value: number;
    };

export default NativeEffectOption;
