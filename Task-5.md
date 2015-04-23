## 任务描述
* 使用 mup 部署在国内的阿里云主机或者AWS上
  - 参考 https://github.com/arunoda/meteor-up
* 生成可以在iPhone/Android手机上安装的app
  - 参考 https://www.meteor.com/try/7

## 任务验收
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
