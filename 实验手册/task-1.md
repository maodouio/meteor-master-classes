## Welog 项目实践
本项目是为配合[毛豆网《Meteor全职开发在线师徒班》](https://github.com/maodouio/meteor-master-classes/blob/master/outline.md)的教学而开展的项目实践。共分为5次实验课（task-1~5），通过对从meteoric框架到实现welog（轻量级微博系统），基本覆盖了Meteor开发移动app的关键技术点，学员可以通过完成这5个任务，掌握Meteor开发的关键技术。

* Welog 项目代码参考 https://github.com/kevingzhang/welog

## 任务1描述
* 清理 meteoric/demo 代码, 得到一个干净的空 App

## 任务1验收
* 提交自己的代码到 meteor-master-classes 自己的 branch 下，并部署到 http://welog-xxx.meteor.com
* 参考 http://welog-limingth.meteor.com

## 检查点 
* 建立开发环境
  - git clone https://github.com/meteoric/demo 
* 分析模板代码
  - 掌握 client/templates/ 下面每个目录的作用
* 清理代码
  - 将暂时不用的移至一个隐藏目录 .notuse 下
* 修改路由，将 / 指向 lists
  - both/router.js
* 修改首页，删除左上角的按钮，更改右上角的icon
  - client/templates/lists/lists.html
* 修改数据，首页显示 posts 数据库信息
  - server/seeds.js
* 修改右上角登陆按钮的触发事件关联
  - client/layout.js
* 修改首页，显示右上角登陆后的提示信息
  - client/templates/lists/lists.html
  - {{#if currentUser}}
* 测试并提交部署后的网址
  - http://welog-xxx.meteor.com
  - 在 moxtra 讨论组中的相关任务中，增添留言提交作业网址
  

