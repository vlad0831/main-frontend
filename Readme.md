# Allio Fintech Mobile frontend


## Provisioning

- see [provisioning](./docs/provision.md) for the first time setup
## Project Setup (will deprecate the following after we switch to Apple Silicon Mac OS)

First, install the following dependencies:
* Xcode
* Xcode command line tools
* Android studio
* At least one android virtual device
* NVM
* Node v14 or above
* yarn
* React Native CLI
* Cocoapods

Before you begin, make sure you've installed Node, yarn, and React Native CLI.

- Clone this repository.
- Run `yarn install` to install dependencies.
- Run `cd ios && pod install && cd ..` to install Pods.

If the build fails due to Flipper-Glog (0.3.6) when using 'pod install'.
Try to run `sudo xcode-select --switch /Applications/Xcode.app` and then `pod install`.

- Create `config.js` file in the root dirctory of the repository with the following fields:

```
export const SENTRY_DSN = ''
```

- Create `appcenter-config.json` in the root directory of the repository with the following format:

```
{
  "app_secret": ""
}
```

Ask another developer for the correct values for the previous two config files.

Finally use `npx react-native run-ios` to run the app.

## How to Use This Project

- To start the project in dev mode, use `yarn start {ios or android}`
- To run tests, use `yarn run test:{ios or android}`
- To lint, use `yarn run lint`

## Setting up E2E Tests

### Setup

- Run the following commands to set Detox up
  ```sh
  brew tap wix/brew
  brew install applesimutils
  yarn global add detox-cli
  ```

### Development builds

- Fire off a Detox development build by running `yarn run build:{ios or android}-{debug or release}`, once the build finishes, you can then run `yarn run e2e:{ios or android}` respectively. It's important to note that for android builds, the simulator needs to be already opened before running the tests.

### Android

- Create a new AVD through Android Studio with an `x86_64` system image, **make sure that you select an image with API level 28 that is an AOSP (Android Open Source Project) image, which shows up without the Google APIs in parenthasees**. Make sure your AVD name matches the release `avdName` in the `package.json`, currently `Nexus_4`.
- You should now be able to run a release build with `yarn run build:{ios or android}-release`


## Stack

* TypeScript
* React Native
  * React Navigation
* Redux
  * Redux Toolkit

## FAQ

### Run project on M1 Macs
**NOTE**: Assuming you have already installed other tools like XCode, Cocoapods, Watchman, etc.

- Install Pods
  ```
  cd ios && arch -x86_64 pod install
  ```

After installing Pods, everything else should be the same as Intel macs.
