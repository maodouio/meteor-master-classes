## 任务5描述
把项目代码最后部署到自己的服务器，并生成iOS/Android app可供下载，是Meteor项目提交前的最后一个环节。在这个任务中，我们将学会并掌握这两个技能。
* 使用 mup 部署在国内的阿里云主机或者AWS上
  - 参考 https://github.com/arunoda/meteor-up
* 生成可以在iPhone/Android手机上安装的app
  - 参考 https://www.meteor.com/try/7

## 任务5验收
* 可以通过 ip 地址来访问网站
  - http://128.199.72.206/
* 可以在手机上下载安装app
  - 手机app上可以使用拍照功能

## 检查点 

### 使用 meteor deploy 部署
* meteor deploy xxx.meteor.com 

### 使用 mup 部署 
* 安装 mup
  - npm install -g mup
* 使用 mup 生成mup.json 和 settings.json
  - mup init
* 修改 mup.json 文件
  - host
  - username
  - password
  - appName
  - ROOT_URL
* 使用 mup 部署
  - mup setup
  - mup deploy
* 安装 SSHPASS
  - Installing SSHPASS
  - https://gist.github.com/arunoda/7790979
  - brew install https://raw.github.com/eugeneoden/homebrew/eca9de1/Library/Formula/sshpass.rb

### 生成手机app
* iOS app
  - meteor install-sdk ios
  - meteor add-platform ios
  - meteor run ios
* xCode to ipa
  - meteor run ios-device --mobile-server http://128.199.72.206/
  - Build Settings : Packaging : Product Name : welog
  - Info : Bundle identifier : com.maodou.maodou 
  - iOS Device, not iPhone
  - Product : Archive : test.ipa
  - create a test.plist and download.html
  - use **https** download
* Android app
  - meteor install-sdk android
  - meteor add-platform android
  - meteor run android
  - meteor run android-device --mobile-server http://128.199.72.206/
* How to submit your Android app to Play Store
  - https://github.com/meteor/meteor/wiki/How-to-submit-your-Android-app-to-Play-Store
  - meteor build ~/build-output-directory --server=your-desired-app-hostname.meteor.com
  - keytool -genkey -alias your-app-name -keyalg RSA -keysize 2048 -validity 10000
  - jarsigner -digestalg SHA1 unaligned.apk your-app-name
  - ~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4 unaligned.apk production.apk
