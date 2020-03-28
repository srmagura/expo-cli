import { InfoPlist } from './IosConfig.types';
import { ExpoConfig } from '../Config.types';

export function getSupportsTablet(config: ExpoConfig) {
  if (config.ios?.supportsTablet) {
    return config.ios?.supportsTablet;
  }

  return false;
}

export function getIsTabletOnly(config: ExpoConfig) {
  if (config.ios?.isTabletOnly) {
    return config.ios.isTabletOnly;
  }

  return false;
}

// TODO: this isn't enough! need to also update pbxproj to add TARGETED_DEVICE_FAMILY
export function getDeviceFamilies(config: ExpoConfig) {
  let supportsTablet = getSupportsTablet(config);
  let isTabletOnly = getIsTabletOnly(config);

  // 1 is iPhone, 2 is iPad
  if (isTabletOnly) {
    return [2];
  } else if (supportsTablet) {
    return [1, 2];
  } else {
    return [1];
  }
}

export function setDeviceFamily(config: ExpoConfig, infoPlist: InfoPlist) {
  return {
    ...infoPlist,
    UIDeviceFamily: getDeviceFamilies(config),
  };
}
