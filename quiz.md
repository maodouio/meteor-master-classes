学习《Discover Meteor 中文版》自测题
====================================

 

-   http://zh.discovermeteor.com/

 

简介
----

1.  Meteor 是基于 Node.js 开发的，怎么理解这句话？

2.  Meteor 程序的代码能在前后两端共用，举例说明。

3.  MVC 框架是指什么？

 

开始
----

1.  Nitrous.io 是什么？有什么用？

2.  用 meteor create 创建的项目，包含哪些文件和目录？

3.  如何访问用 meteor 生成的网站？ 怎么指定其他端口？

4.  underscore 是什么？有什么用？

5.  `/lib` 文件夹中的文件是优先加载，还是最后加载？

6.  静态文件（字体，图片等）放置在哪个文件夹中？

7.  隐藏的 `.meteor` 文件夹下有两个文件 packages 和 release 有什么用？

8.  下划线命名法，驼峰命名法和连字号 分别用在什么场合？

9.  使用 CoffeeScript 需要添加什么包支持？

 

部署
----

1.  部署使用什么命令？

2.  mup 是什么意思？有什么用？

3.  mup init 创建了两个文件 mup.json 和settings.json 是做什么的？

 

模板
----

1.  把所有的文件放在同一目录，甚至所有的代码放在同一个文件，这样做有问题吗？

2.  Spacebars 是什么？ 有什么用？

3.  {{#each post}} 这段代码怎么理解？

 

Git 和 Github
-------------

1.  如何下载 github 上的一个项目代码？

2.  git checkout -b new_branch_name 这条命令做什么？

3.  git checkout c7af59e425cd4e17c20cf99e51c8cd78f82c9932 后面的这个是什么？

 

集合
----

1.  Collection，publications，subscriptions 三者是什么关系？

2.  关键字 var 限制对象的作用域是局部的，还是全局的？

3.  启动 mongo shell 用什么命令？

4.  MiniMongo 是什么？ 和 Mongo 有什么异同？

5.  meteor reset 有什么用？

6.  mongo db 的增删改查操作，分别用什么api？

7.  autopublish 这个包有什么用？

8.  publish 和 subscribe 的第一个参数用小写，还是大写？

9.  创建一个集合是使用 new Mongo.Collection 还是 new Meteor.Collection？

 

发布与订阅
----------

1.  延迟补偿 latency compensation 是什么意思？http://docs.meteor.com/#sevenprinciples

2.  DDP 是什么的缩写？（Distributed Data Protocol or Dynamic Data Protocol？）

3.  客户端进行订阅的时候，指定参数有什么用？ Meteor.subscribe('posts', 'bob-smith');

4.  用 Posts.find 返回了一个游标，系统会自动发布这个游标，Meteor 这样实现有什么好处？

5.  如何只发布指定的部分字段？

6.  [Meteor 的重要特性有一条是数据库无处不在，这句话你怎么理解？](<http://docs.meteor.com/#sevenprinciples>)

 

路由
----

1.  [Iron Router 是Meteor系统内部的，还是第三方的包？](<https://github.com/EventedMind/iron-router>)

2.  {{> spinner}} 这个是干什么的？

3.  {{#with myWidget}} 这种写法很常见，是什么意思？

4.   {{pathFor 'postPage'}}

5.   Iron Router 的作者是谁？ 为啥起这个名字？

6.  解释一下这段代码的含义。

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Router.route('/posts/:_id', {
  name: 'postPage',  
  data: function() { return Posts.findOne(this.params._id); }
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

会话
----

1.  Meteor 的会话（Session）和 http 的 session 是一个东西吗？

2.  Session 对象*不在*用户之间共享，甚至在浏览器标签之间。 请举例说明。

3.  动态代码重载技术（Hot Code Reload） 是什么技术？

 

添加用户
--------

1.  accounts-ui 和 accounts-ui-bootstrap-3 这两个包有什么不同？

2.  config.js 里面配置 passwordSignupFields: 'USERNAME_ONLY' 起什么作用？

3.  为什么 Meteor.users.find().count();有时只返回1，而不是系统全部用户数量？

4.  为什么用户的集合似乎在服务器和客户端中并不是包含完全相同的字段？

5.  通过 什么可以 获得当前登录的用户。用户注销之后，还有效吗？

 

响应式 Reactivity
-----------------

1.  什么是一个 AJAX 调用？有什么用？请举例说明。

2.  在后台，当底层的数据集合被更新以后， Meteor 能够马上修改用户界面的任何部分。这是怎么做到的？

3.  helper 方法中，return Posts.find(); 包含了一个 observe() 的回调方法，这个有什么用？

 

创建帖子
--------

1.  响应表单提交的 submit 事件和按钮的 click 事件有什么不同？

2.   jQueryhttp://jquery.com/ 是什么？ 怎么使用 jQuery 去获取我们表单字段的值？

3.  没有登录的用户有时仍然可以在浏览器控制台中创建一个帖子，这是为什么？

4.  Posts.allow 中只要客户登陆后，就允许去插入帖子，这应该怎么写？

5.  用户是否有正确的登录凭证，用 Meteor.user() 和 Meteor.loggingIn()来判断有什么不同？

6.  currentUser 相当于是哪个函数方法的调用？

7.  Meteor.call 方法通常带2个参数，e 和 r 分别代表什么意思？

8.  Meteor.methods 里面的方法是在客户端调用，还是在服务器端调用？

 

延迟补偿
--------

1.  描述一下 Meteor.call 方法调用 postInsert 之后客户端和服务器直接的工作流程是怎样的？

2.  延迟补偿的好处是什么？可能存在的问题和困惑又是什么？

3.  集合的操作方法 insert、update 和 remove一般会放在哪个目录下？C和S都会同时运行吗？

 

编辑帖子
--------

1.   postEdit 模板和 postAdd 这两个模板，最大的区别体现在哪里？

2.  一般情况下，我们只允许帖子的发布者来进行修改帖子，这怎样实现？

3.  移除了 insecure 包之后，默认情况下，我们在客户端对数据库的修改到了服务器端都会拒绝还是接受？

4.  尽管你可以编辑自己的帖子，但并不意味着你可以允许去编辑帖子的每个属性。怎么理解？

5.  举例说明一下，Meteor内置方法的适用场景有哪些？

 

允许和拒绝
----------

1.  一个成功的 insert 操作，在 allow 和 deny 的关系上，需要满足什么必要条件？

2.  当你尝试从浏览器的控制台删除一篇不属于你的帖子的时候，延迟补偿会导致什么现象？

3.  服务端的所有操作都被认定为安全的，不需要被权限系统验证。这有什么需要注意的？

 

错误
----

1.  Errors = new Mongo.Collection(null); 这样用 null 创建的集合有什么特点？

2.  你会注意到错误消息在几秒钟后自动消失。这是怎么做到的？

3.  一旦模板在浏览器中渲染完毕，[哪个]回调函数会被触发？

 

创建 Meteor Package
-------------------

1.  如何创建 package ，使用哪个命令，哪个参数？

2.  如何发布 package ，使用哪个命令，哪个参数？

3.  package.js 这个文件有什么用？

 

评论
----

1.  如何只加载当前文章的评论？

2.  订阅代码从路由器级改到路径级，怎么理解这句话？

3.  路径级订阅的优缺点各是什么？

 

非规范化
--------

1.  怎么理解什么是非规范化的数据？

2.  规范化的做法有什么缺点？

3.  为什么不直接在帖子文档中嵌入评论？而是用集合的方式来单独实现 comments？

 

Notifications
-------------

1.  实现 Notification 与实现 Error 之间的异同有哪些？

2.  如何限制通知只给特定用户，而不是全部用户都知道。

3.  如果要判断某个通知已经被阅读过了，从而不再重复通知，如何实现？
