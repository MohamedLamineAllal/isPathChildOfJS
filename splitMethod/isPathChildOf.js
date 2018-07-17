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


module.exports = isPathChildOf;

// export default isPathChildOf;