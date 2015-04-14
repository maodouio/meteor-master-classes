## 任务描述
* 清理 meteoric/demo 代码, 得到一个干净的空 App

## 任务验收
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
  

