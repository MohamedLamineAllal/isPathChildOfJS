const isPathChildOf = require('./isPathChildOf');

//old same test as with the splitMethod (i wrote the split Method first)

let path = '/ok/this\\is/the/path';
let parentPath = '/ok/this/is';
let parentPath2 = '/ok/this/is/';
let parentPath3 = '/notok/this/is/different';

console.log("/ok/this\\is/the/path' is child of /ok/this/is => " + isPathChildOf(path, parentPath));
console.log("/ok/this\\is/the/path' is child of /ok/this/is/=> " + isPathChildOf(path, parentPath2));
console.log("/ok/this/is/' is child of /ok/this/is/ => " + isPathChildOf(parentPath2, parentPath2));
console.log("/ok/this/is/the/path' is child of /notok/this/is/different => " + isPathChildOf(path, parentPath3));

// test number 2:

console.log('test number 2 : ');
console.log("=============================");

let pthParent = '/look/at/this/path';
let pth = '/look/at/this/patholabi/hola'; // in normal use of indexof it will return true (know too we didn't use indexof just to support the different path separators, otherwise we would have used indexof in our function)

//expected result is false
console.log(`${pth}  is a child of ${pthParent}  ===>  ${isPathChildOf(pth, pthParent)}`);


// this test along with the commented portion within the code of isChildOf.js, is to show that there is no need to think like in c++ and try to do some optimization to avoid copying string and all, in javascript the strings are immutable, and passed two by reference in function, (you're curious what does that mean, see the comment in the bottom of the page)
// console.log("----after exec----");
// console.log("path = " + path);
// console.log("parentPath = " + parentPath);
// console.log("----after exec----");

let pthParent2 = '/look/at/this/path';
let pth2 = '/look/at/this/path/hola'; // in normal use of indexof it will return true (know too we didn't use indexof just to support the different path separators, otherwise we would have used indexof in our function)

//expected result is true
console.log(`${pth2}  is a child of ${pthParent2}  ===>  ${isPathChildOf(pth2, pthParent2)}`);


let pthParent3 = '/look/at/this/path';
let pth3 = '/look/at/this/pathholabi'; 

//expected result is false
console.log(`${pth3}  is a child of ${pthParent3}  ===>  ${isPathChildOf(pth3, pthParent3)}`);


// test 3: equality
console.log('\ntest 3 : equality');
console.log("==========================");

let pParent =  "/this/is/same/Path";
let p =  "/this\\is/same/Path/";

console.log(`${p} is child of  ${pParent}   ====> ${isPathChildOf(p, pParent, true)}`);

/**
 * 
 * strings are immutable and passed by reference in function
==> what the heck

well that mean, they are not copied when passed, but just a reference  is assigned to the new function local variable. But strings are immutable, so they can't be modified. What happen when you assign a new sting, each time you use an operation like + or concat function, you need always to assign the new value, and that because a new string is created, and then you assign a reference to that string to your variable. (there is no method for string that modify it directly, always you need to reassign if you want to change the value)

=> also Know that once there is no reference pointing to the string (immutable string) the garbage collector wil take care of deleting it. (and that's it)
 * 
 * 
 * 
 */