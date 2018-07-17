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





# method 1 : Comparing strings

```javascript

const PATH_SEPA = ['\\', '/'];

function isPathChildOf(path, parentPath) {
    path = path.trim();
    parentPath = parentPath.trim();

    // trick: making sure the paths end with a separator
    let lastChar_path = path[path.length - 1];
    let lastChar_parentPath = path[parentPath.length - 1];
    if (lastChar_parentPath !== '\\' && lastChar_parentPath !== '/') parentPath += '/';
    if (lastChar_path !== '\\' && lastChar_path !== '/') path += '/';

    // testing string (strings are immutable, and are passed by ref)
    // console.log("-----within the func-----");
    // console.log("path = " + path);
    // console.log("parentPath = " + parentPath);
    // console.log("-----within the func-----");    

    if (parentPath.length >= path.length) return false; // parent path should be smaller in characters then the child path (and they should be all the same from the start , if they differ in one char then they are not related)

    for (let i = 0; i < parentPath.length; i++) {
        if (!(isPathSeparator(parentPath[i]) && isPathSeparator(path[i])) && parentPath[i] !== path[i]) {// if both are not separators, then we compare (if one is separator, the other is not, the are different, then it return false, if they are both no separators, then it come down to comparaison, if they are same nothing happen, if they are different it return false)
            return false;
        }
    }
    return true;
}

function isPathSeparator(chr) {
    for (let i = 0; i < PATH_SEPA.length; i++) {
        if (chr === PATH_SEPA[i]) return true;
    }
    return false;
}

```


# method 2: split and compare 

```javascript
function isPathChildOf(path, parentPath) {
    // we remove the last character if it's a path separator (that just to have our splitStr still work well for the purpose)
    let pathLastChr = path[path.length - 1];
    let parentPathLastChr = parentPath[parentPath.length - 1];
    if(pathLastChr === '\\' || pathLastChr === '/') path = path.substr(0,path.length - 1);
    if(parentPathLastChr === '\\' || parentPathLastChr === '/') parentPath = parentPath.substr(0, parentPath.length - 1);

    if(path.length <= parentPath.length) return false; // the parentPath should be of a length smaller then  the child path (why they are the same until the parent end)

    let spPath = splitPath(path);
    let spParentPath = splitPath(parentPath);
    
    // if(spPath.length <= spParentPath.length) return false; // if the parent path is bigger then the child or equal, then the child is n't a child

    for(let i = 0; i < spParentPath.length; i++){
        if(spParentPath[i] !== spPath[i]) return false;
    }
    return true;
}

/**
 * NOTE: here the split will show empty strings, (i could have used the splitStr_filter, but it doesn't matter, so just note that, our use case here is to compare two paths and make sure they are same path)
 * @param {*} path 
 */
function splitPath(path) {
    return splitStr(path, ["/","\\"]);
}


function splitStr(str, separators) {
    if (Array.isArray(separators)) {
        let splitArr = [];
        let lastSplitIndex = -1;
        for (let i = 0; i < str.length; i++) {
            let found = false;
            for (let j = 0; j < separators.length; j++) {
                if (str[i] === separators[j]) {
                    found = true;
                    break;
                }
            }

            if (found) {
                splitArr.push(str.substring(lastSplitIndex + 1, i));
                lastSplitIndex = i;
            }
        }
        if (lastSplitIndex !== str.length - 1) { // lastSPlit index isn't  the last character of the string, then there is a string after the last split separator
            splitArr.push(str.substring(lastSplitIndex + 1, str.length));
        } else { // if the last element is a separator then we will add an empty string to the array (last separation a string against void)
            splitArr.push('');
        }

        return splitArr;
    } else {
        return str.split(separators);
    }
}
```