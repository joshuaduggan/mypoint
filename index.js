#!/usr/bin/env node

const fs = require('fs');

const defaultStr = fs.readFileSync("./xinputdata/default.txt", 'utf8');
const listPropsStr = fs.readFileSync("./xinputdata/list-props.txt", 'utf8');

const args = process.argv.slice(2);

let rawDefLs = defaultStr.split(/\r?\n/);
let trimDefLs = [];
rawDefLs.forEach((s) => {
    if (/slave  pointer/.test(s) && !/Virtual core/.test(s)) {
        trimDefLs.push(s.match(/↳ (.*)id=\d+/)[1].trim());
    }
});
console.log(trimDefLs);

//console.log(neato);
//console.log(args);
//console.log(defaultStr);
//console.log(listPropsStr);
