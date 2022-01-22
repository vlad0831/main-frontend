import pickingService from './picking';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    Version: '1.0',
  },
}));

jest.mock('react-native-iphone-x-helper', () => ({
  isIphoneX: jest.fn(() => true),
}));

describe('PickingService', function () {
  it('should get Platform OS', () => {
    expect(pickingService.getPlatformOS()).toBe('ios');
  });

  it('should get Platform Version', () => {
    expect(pickingService.getPlatformVersion()).toBe(1);
  });

  it('should get Platform Group', () => {
    expect(pickingService.getPlatformGroup()).toBe('iPhoneX');
  });
});
