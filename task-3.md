## 任务3描述
在任务2完成的基础上，实现如下3个新功能特性，掌握Meteor框架中关于添加用户、数据发布和订阅以及权限管理方面的开发技能。
* 实现用户登陆功能
  - 为用户添加 username 字段
* 取消 autopublish 和 insecure 改用 pub/sub 机制
  - 参考 http://zh.discovermeteor.com/chapters/publications-and-subscriptions/
* 设定用户对 post 的权限，例如只允许用户编辑和删除自己的帖子
  - Allow/Deny
  - 测试权限

## 任务3验收
* 新创建用户，要求填写 username 
* 客户端可以看到 hi, {{username}}，取代 hi, {{email}}
* 登录用户可以创建新的 post
* 登录用户可以修改自己创建的 post
* 其他浏览功能都与之前采用 autopublish/insecure 方式下的一样

## 检查点 

### 添加username字段
* 修改AccountsTemplates
  - client/templates/userAccounts/userAccounts.js 
  - AccountsTemplates.addField

### 发布 username 字段到 client 端
* 取消 autopublish 和 insecure
  - meteor remove autopublish
  - meteor remove insecure

### Server端增加 publishComposite
* 添加 reywood:publish-composite
  - meteor add reywood:publish-composite
* 添加 Posts 数据发布
  - server/publish.js
  - Meteor.publishComposite('Posts')
* 添加单个 post 数据发布
  - Meteor.publishComposite('post')

### Client端增加 subscription
* 增加 lists 的 router subscription
  - both/router.js 
  - this.route('lists', {subscriptions:Meteor.subscribe('Posts');});
* 增加 postView 的 router subscription
  - this.route('postView', {subscriptions: function() { Meteor.subscribe('post', this.params._id);});

### Server端添加权限管理
* 增加 Posts 的 insert 权限
  - server/permissions.js 
  - Posts.allow({'insert'});
* 增加 Posts 的 update 权限
  - 'update': return userId === doc.authorId;



