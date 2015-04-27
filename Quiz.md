
# 学习《Discover Meteor 中文版》自测题

* http://zh.discovermeteor.com/

简介
----

-   Meteor 是基于 Node.js 开发的，怎么理解这句话？

-   Meteor 程序的代码能在前后两端共用，举例说明。

-   MVC 框架是指什么？


开始
----

-   Nitrous.io 是什么？有什么用？

-   用 meteor create 创建的项目，包含哪些文件和目录？

-   如何访问用 meteor 生成的网站？ 怎么指定其他端口？

-   underscore 是什么？有什么用？

-   `/lib` 文件夹中的文件是优先加载，还是最后加载？

-   静态文件（字体，图片等）放置在哪个文件夹中？

-   隐藏的 `.meteor` 文件夹下有两个文件 packages 和 release 有什么用？

-   下划线命名法，驼峰命名法和连字号 分别用在什么场合？

-   使用 CoffeeScript 需要添加什么包支持？


部署
----

-   部署使用什么命令？

-   mup 是什么意思？有什么用？

-   mup init 创建了两个文件 mup.json 和settings.json 是做什么的？


模板
----

-   把所有的文件放在同一目录，甚至所有的代码放在同一个文件，这样做有问题吗？

-   Spacebars 是什么？ 有什么用？

-   {{#each post}} 这段代码怎么理解？


Git 和 Github
-------------

-   如何下载 github 上的一个项目代码？

-   git checkout -b new_branch_name 这条命令做什么？

-   git checkout c7af59e425cd4e17c20cf99e51c8cd78f82c9932 后面的这个是什么？


集合
----

-   Collection，publications，subscriptions 三者是什么关系？

-   关键字 var 限制对象的作用域是局部的，还是全局的？

-   启动 mongo shell 用什么命令？

-   MiniMongo 是什么？ 和 Mongo 有什么异同？

-   meteor reset 有什么用？

-   mongo db 的增删改查操作，分别用什么api？

-   autopublish 这个包有什么用？

-   publish 和 subscribe 的第一个参数用小写，还是大写？

-   创建一个集合是使用 new Mongo.Collection 还是 new Meteor.Collection


发布与订阅
----------

-   延迟补偿 latency compensation 是什么意思？http://docs.meteor.com/#sevenprinciples

-   DDP 是什么的缩写？（Distributed Data Protocol or Dynamic Data Protocol？）

-   客户端进行订阅的时候，指定参数有什么用？ Meteor.subscribe('posts', 'bob-smith');

-   用 Posts.find 返回了一个游标，系统会自动发布这个游标，Meteor 这样实现有什么好处？

-   如何只发布指定的部分字段？

-   [Meteor 的重要特性有一条是数据库无处不在，这句话你怎么理解？](<http://docs.meteor.com/#sevenprinciples>)


路由
----

-   [Iron Router 是Meteor系统内部的，还是第三方的包？](<https://github.com/EventedMind/iron-router>)

-   {{> spinner}} 这个是干什么的？

-   {{#with myWidget}} 这种写法很常见，是什么意思？

-    {{pathFor 'postPage'}}

-    Iron Router 的作者是谁？ 为啥起这个名字？

-   解释一下这段代码的含义。

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Router.route('/posts/:_id', {
  name: 'postPage',  
  data: function() { return Posts.findOne(this.params._id); }
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


会话
----

-   Meteor 的会话（Session）和 http 的 session 是一个东西吗？

-   Session 对象*不在*用户之间共享，甚至在浏览器标签之间。 请举例说明。

-   动态代码重载技术（Hot Code Reload） 是什么技术？

