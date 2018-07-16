# isPathChildOfJS

That's a function that check if a path is a child of another path, with a custom fast split function (handling both path split separator \ and /). 

the logic is stright forward, we split the paths to arrays, then we loop through the array of the parent path and check if it's all the same. if not then it's not a child, otherwise it is. (also we check if the length of the parent path is less or not then the path, if it isn't then the path isn't a child). (well just check the code, to get it better).

you find the function in isPathChildOf.js.


you find a test in test.js

```
node test
```
