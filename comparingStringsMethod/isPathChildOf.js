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

module.exports = isPathChildOf;
// export default isPathChildOf;