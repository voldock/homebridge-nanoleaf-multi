import platformFactory from './platformFactory';

export default (homebridge: any) => {
  const Platform = platformFactory(homebridge);

  homebridge.registerPlatform(
    'homebridge-nanoleaf-multi',
    'NanoleafMulti',
    Platform
  );
};
