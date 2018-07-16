const isPathChildOf = require('./isPathChildOf');

let path = '/ok/this/is/the/path';
let parentPath = '/ok/this/is';
let parentPath2 = '/ok/this/is/';
let parentPath3 = '/notok/this/is/different';

console.log("/ok/this/is/the/path' is child of /ok/this/is => " + isPathChildOf(path, parentPath));
console.log("/ok/this/is/the/path' is child of /ok/this/is/=> " + isPathChildOf(path, parentPath2));
console.log("/ok/this/is/' is child of /ok/this/is/ => " + isPathChildOf(parentPath2, parentPath2));
console.log("/ok/this/is/the/path' is child of /notok/this/is/different => " + isPathChildOf(path, parentPath3));
