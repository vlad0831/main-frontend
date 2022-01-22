# Provision (for Apple Silicon Laptop)

## Homebrew
- install homebrew if you haven't: [instruction](https://brew.sh/)

## Xcode
- install xcode from App Store

- install xcode command line tools if not installed
  ```sh
  xcode-select --install
  ```

## Java Development Kit
- install jdk
  ```sh
  brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
  ```

## Android Studio
- install android studio
  ```sh
  brew install --cask android-studio
  ```
- install required android sdk: [instruction](https://reactnative.dev/docs/environment-setup#:~:text=2.-,Install%20the%20Android%20SDK,-Android%20Studio%20installs)
- add the following to `~/.zshrc`
  ```sh
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
- add an android virtual device: [instruction](https://reactnative.dev/docs/environment-setup#:~:text=Using%20a%20virtual%20device)

## NVM
- install nvm
  ```sh
  brew install nvm
  ```
- install the node version specified in the project
  ```sh
  nvm install
  ```

## Yarn
- install yarn globally
  ```sh
  npm i -g yarn
  ```
- install the node dependencies of the project under the project root folder
  ```sh
  yarn install
  ```

## React Native CLI
- the cli is built in React Native node package
  
## Cocoapods
- install cocoapods
  ```sh
  brew install cocoapods
  ```
- install pods for ios environment
  ```sh
  cd ios
  arch -x86_64 pod install
  cd ..
  ```

### Note
- If you encounter an error while running `pod install`.
- Ensure you have `ffi` installed by running `sudo arch -x86_64 gem install ffi`.

## Configure the Project
- copy the example config files to the correct file
  ```sh
  cp ./config.example.js ./config.js
  cp ./appcenter-config.example.json ./appcenter-config.json 
  ```
- replace with the correct configuration values

## Run the app
- run ios simulator
  ```sh
  yarn ios
  ```

## FAQ
### Pod install failed due to Flipper-Glog
- Try to run `sudo xcode-select --switch /Applications/Xcode.app` and then `arch -x86_64 pod install`
