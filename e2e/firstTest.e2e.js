describe('First test', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcomeScreen'))).toBeVisible();
    await element(by.id('welcomeScrollView')).scrollTo('bottom');
  });
});
