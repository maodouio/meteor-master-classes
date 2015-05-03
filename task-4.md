## 任务4描述
学会集成第三方提供的优秀的package是Meteor项目成功的关键。通过这个任务，我们开始使用和体验两个常见package，加快项目开发速度和提高编码效率。
* 采用 simpleSchema 和 autoform/quickForm 来实现添加/编辑 post
  - 参考 http://autoform.meteor.com/qfdetails
* 增添 post 发照片功能（目前只支持pc浏览器和app，不支持web浏览器）
  - 参考 https://github.com/kevingzhang/meteor101cam
  - 可以简化设计为一个post可以是发一段文字，允许附带一张照片

## 任务4验收
* 直接通过 quickForm 来完成 insert 到数据库的添加操作
  - 用户点击 submit，无需使用 insert 函数调用
* 允许用户在发 post 时，附带一张照片
  - 用户添加 post，则需要手工编写 拍照按钮 和 submit按钮 的代码
* 如果用户忘记拍照，则允许用户 Edit 编辑 post
  - 没有拍照的帖子可以点击 拍照按钮 上传一张照片

## 检查点 

### 添加quickForm支持
* 添加 autoform 和 autoform-ionic
  - meteor add aldeed:autoform
  - meteor add meteoric:autoform-ionic

### 添加AutoForm表单处理
* 替换原来的 input 元素为 quickForm 表单
  - client/templates/addPost/addPost.html
  - {{> quickForm collection="Posts" doc=post id="edit-form" type="insert" fields="title,body,published" buttonContent="Submit"}} 
* 添加 AutoForm hooks
  - client/templates/addPost/addPost.js 
  - AutoForm.hooks({'edit-form'});
* 设置 quickForm 表单显示风格
  - client/templates/addPost/addPost.js 
  - AutoForm.setDefaultTemplate('ionic');
* postView 的显示代码无需修改

### 添加发照片功能
* 添加照相机支持
  - meteor add meteoric:camera
* 修改 Posts 的 simpleSchema 
  - 加入 pic { type: String }
* 修改 addPost Template
  - client/templates/addPost/addPost.html
  - {{#autoForm collection="Posts" id="edit-form" type="insert"}}
  - \<a class="button icon ion-android-camera"\>+\</a\>
  - 参考 http://autoform.meteor.com/qfdetails
* 增加点击照相按钮的消息处理
  - client/templates/addPost/addPost.js 
  - 增加 getPicture 函数
  - 'click a.ion-android-camera': function(e) {return MeteoricCamera.getPicture({})}
* 增加点击提交Submit按钮的消息处理
  - client/templates/addPost/addPost.js 
  - newPost = {title, body, pic, published}
  - postId = Posts.insert(newPost);
* 修改 postView 的照片显示功能
  - client/templates/postView/postView.js 
  - 增加 {{#if pic_is_taken}} 的 helper 支持
  - 使用 \<img class="full-image" src="{{pic}}"/\> 显示图片
* 增加Edit功能的支持
  - client/templates/editPost/editPost.js 
  - client/templates/editPost/editPost.html
  - 参考 addPost.js 和 addPost.html 的实现
  - 注意如果已经有拍照，则不允许修改；如果没有拍照，则允许拍一张上传
