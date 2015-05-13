## 任务2描述
在任务1完成meteoric-boilerplate的基础上，实现并掌握通过Meteor对后台数据库的增删改查操作。
* 显示 Posts 列表
* 显示 Post View
* 新增 Post 页面
* 修改 Post 页面

## 任务2验收
* 提交自己的代码到 meteor-master-classes 自己的 branch 下，并部署到 http://welog-xxx.meteor.com
* 参考 http://welog-limingth.meteor.com

## 检查点 

### 显示 Posts 列表
* 修改数据
  - server/seeds.js

### 显示 Post View
* 增加 viewpost div
  - client/templates/lists/lists.html
  - \<div class="viewpost" data-id="{{_id}}"\>
* 增加 viewpost click 事件处理
  - client/templates/lists/lists.js
  - Router.go("/postView/#{@_id}");
* 增加 postView 目录
  - client/templates/postView
* 增加 postView template
  - client/templates/postView/postView.html
* 增加路由 postView
  - both/router.js
  - this.route('postView');
* 修改 simple schema
  - both/collections.js

### 新增 Post 页面
* 增加 addPost 目录
  - client/templates/addPost
* 增加 addPost template
  - client/templates/addPost/addPost.html
* 增加 addPost js
  - client/templates/addPost/addPost.js
  - Posts.insert(newPost);

### 修改 Post 页面
* 增加 editPost 目录
  - client/templates/editPost
* 增加 editPost template
  - client/templates/editPost/editPost.html
* 修改 postView，右上角显示 Edit 按钮
  - client/templates/postView/postView.js
* 增加路由 editPost
  - both/router.js
  - this.route('editPost');
* 增加 editPost.js
  - client/templates/addPost/editPost.js
  - Posts.update({_id: this._id}, {$set: updateObj});

### 用户头像使用 avatar （选作）
* 增加 bengott:avatar 支持
  - meteor add bengott:avatar
* lists 增加函数 get_avatar_url
  - client/templates/lists/lists.js
* postView 增加函数 get_avatar_url_from_post
  - client/templates/postView/postView.js
