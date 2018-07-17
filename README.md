# isPathChildOfJS

In this project you will find the implementation of a function that check if a path is a child of another path. There is two methods implemented each one in it's directory. One is using  a custom fast split function (handling both path split separator \ and /)  [we split the paths then we compare]. 
The other directly compare strings (typically I used a trick that can even allow us to use `indexOf` [i didn't used it, to support multiples path separtors]) .

The logic is stright forward for the split method, we split the paths to arrays, then we loop through the array of the parent path and check if it's all the same. if not then it's not a child, otherwise it is. (also we check if the length of the parent path is less or not then the path, if it isn't then the path isn't a child). (well just check the code, to get it better).


For the second methode (comparing strings):
The trick is to check if the path end with a separator, if not you just add such a separator to it. In that, there will be no problem of having a substring that is not a complete path in the child path. [`/this/isme_man` and `/this/isme`] (the first is child of the second, if we simply use indexOf (which of course if false), but if you do using the trick like this [`/this/isme/` and `/this/isme_man/`] and you compare using same indexOf there will be no problem, and it work nikel)


you find the function in isPathChildOf.js (check each directory).


you find a test in test.js

```
node test 
```
from within the diro.
