# meteor-master-classes
First meteor master classes 

## Add good resourses
* https://github.com/limingth/meteor-master-classes/wiki

## Ask a question
* https://github.com/limingth/meteor-master-classes/issues 

## An example of how to cut out demo code
* https://github.com/dalequi/meteor-meteoric-boilerplate
* https://github.com/dalequi/meteor-meteoric-boilerplate/tree/master/client/templates

## Your demo can refer to 
* http://welog-limingth.meteor.com

## How to create your own branch
```
li@MacbookAir ~/Github$ git clone https://github.com/limingth/meteor-master-classes
Cloning into 'meteor-master-classes'...
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
Checking connectivity... done.
li@MacbookAir ~/Github$ cd meteor-master-classes/
li@MacbookAir ~/Github/meteor-master-classes$ git branch limingth
li@MacbookAir ~/Github/meteor-master-classes$ git checkout limingth
Switched to branch 'limingth'
li@MacbookAir ~/Github/meteor-master-classes$ git branch
* limingth
  master
li@MacbookAir ~/Github/meteor-master-classes$ meteor create hello
hello: created.                               

To run your new app:                          
  cd hello                                    
  meteor                                      
li@MacbookAir ~/Github/meteor-master-classes$ cd hello/
li@MacbookAir ~/Github/meteor-master-classes/hello$ meteor
[[[[[ ~/Github/meteor-master-classes/hello ]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/
^C
li@MacbookAir ~/Github/meteor-master-classes/hello$ cd ..
li@MacbookAir ~/Github/meteor-master-classes$ ls
README.md	hello
li@MacbookAir ~/Github/meteor-master-classes$ git add hello/
li@MacbookAir ~/Github/meteor-master-classes$ git commit -a -m "Add hello repo"
li@MacbookAir ~/Github/meteor-master-classes$ git push 
fatal: The current branch limingth has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin limingth

li@MacbookAir ~/Github/meteor-master-classes$ git push --set-upstream origin limingth
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/limingth/meteor-master-classes
 * [new branch]      limingth -> limingth
Branch limingth set up to track remote branch limingth from origin.
li@MacbookAir ~/Github/meteor-master-classes$ 
```
