const PATH_SEPA = ['\\', '/'];

function isPathChildOf(path, parentPath) {
    path = path.trim();
    parentPath = parentPath.trim();

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
        let sepaParent = isPathSeparator(parentPath[i]);
        let sepaChild = isPathSeparator(path[i]);
        if (sepaParent && !sepaChild) { // if parent char is a separator, then if the other is not that's not a child
            return false;
        } else if (parentPath[i] !== path[i]  && (!sepaParent || !sepaChild)) { // here what left is both are separator, or parent not sepa and child one of the two possibilites,  execept for the first case both sepa, where the direct comparaison will fail (give wrong, but it's true) then we take of just that casen, and it's nice (we have covered all cases where it can be false)  
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