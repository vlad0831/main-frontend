import { Platform, PlatformOSType as RNPlatformOSType } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

type PlatformOSType = RNPlatformOSType | 'default' | 'iPhoneX' | 'notIphoneX';

type PlatformType<T> = {
  [osType in PlatformOSType]?: T;
};

function getPlatformOS(): 'ios' | 'android' | 'windows' | 'macos' | 'web' {
  return Platform.OS;
}

function getPlatformVersion(): number {
  return parseInt(Platform.Version.toString(), 10);
}

function getPlatformGroup(): 'iPhoneX' | 'notIphoneX' {
  return isIphoneX() ? 'iPhoneX' : 'notIphoneX';
}

function forPlatform<T>(platform: PlatformType<T>, fallback: T): T {
  const OSKey = getPlatformOS();
  const groupKey = getPlatformGroup();
  const defaultKey = 'default';

  return platform[OSKey] || platform[groupKey] || platform[defaultKey] || fallback;
}

export default {
  getPlatformGroup,
  getPlatformOS,
  getPlatformVersion,
  forPlatform,
};
