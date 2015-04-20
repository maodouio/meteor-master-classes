## 《Meteor全栈开发在线师徒班》

### 预习基础
* 《Discover Meteor 中文版》
  - http://zh.discovermeteor.com
* 视频学习《node.js上最新HTML5开发框架-Meteor》
  - http://www.maiziedu.com/lesson/3446/
* 视频学习《Meteor开发者交流日-Kevin技术讲座》
  - http://www.youku.com/playlist_show/id_23545469.html
  
### 理论内容
* Tools
  - Meteor
  - Chrome
  - Robomongo
  - Sublime Text/WebStorm
  - Git and Github
* Commands
  - meteor create/run/add/mongo/deploy/log
  - git init/add/commit/push/pull/log
* Basics
  - HTML5
  - CSS/LESS
  - JavaScript/CoffeeScript
* Meteor 7 Principles
  - Data on the Wire
  - Latency Compensation
  - Full Stack Reactivity
* Basic Concepts
  - Template/Event/Helper
  - Session/Reactive
  - Blaze/Handlebar
* Meteor app structure
  - client/server/lib/public/packages/tests
  - publications/subscriptions/methods/collections/routes/seeds
* Publish and Subscription
  - Minimongo
  - DDP
  - cursor/record set
  - Multiple Subscriptions 
  - Publish with userFields
* Allow and Deny
  - insert/update/remove
* Packages
  - Iron router
  - ionic framework/UI 
  - simple-schema
  - aldeed:autoform
  - underscore
  - reywood:publish-composite
  - anti:fake
  - momentjs:moment
  - bengott:avatar
* Meteor Deploy
  - meteor deploy/settings
  - meteor up/mup/mup.json
  - how to deploy to aliyun/amazon EC2

### 实验内容
* Task-1: 清理 meteoric/demo 代码, 得到一个干净的空 App
  - 建立开发环境
  - 分析模板代码
  - 掌握 client/templates/ 下面每个目录的作用
  - 清理代码
  - 修改路由，将 / 指向 lists
  - 修改首页，删除左上角的按钮，更改右上角的icon
  - 修改数据，首页显示 posts 数据库信息
  - 修改右上角登陆按钮的触发事件关联
  - 修改首页，显示右上角登陆后的提示信息
  - 测试并提交部署后的网址
* Task-2: 实现对 posts 数据库的增删改查操作
  - 显示 Posts 列表
  - 显示 Post View
  - 新增 Post 页面
  - 修改 Post 页面
  - 用户头像使用 avatar
* Task-3: 实现用户登录、权限管理和数据订阅与发布
  - 实现用户登陆功能
  - 为用户添加 username 字段
  - 取消 autopublish 和 insecure 改用 pub/sub 机制
  - 设定用户对 post 的权限，例如只允许用户编辑和删除自己的帖子
* Task-4: 实现高级表单和照相功能
  - 采用 simpleSchema 和 autoform/quickForm 来实现添加/编辑 post
  - 增添 post 发照片功能（目前只支持pc浏览器和app，不支持web浏览器）
  - 可以简化设计为一个post可以是发一段文字，允许附带一张照片
* Task-5: 实现app应用的部署和发布
  - 使用 mup 部署在国内的阿里云主机或者AWS上
  - 生成可以在iPhone/Android手机上安装的app

### 国外视频学习资源
* https://www.eventedmind.com/
* https://www.youtube.com/playlist?list=PLKfAG4yMwKkRT4SVt_j04AnZSKcdYPFgx
