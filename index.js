#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('node:child_process');

const defaultStr = fs.readFileSync("./xinputdata/default.txt", 'utf8');
const listPropsStr = fs.readFileSync("./xinputdata/list-props.txt", 'utf8');

const args = process.argv.slice(2);
const mouseSpeed = (args.length > 0) ? args[0] : 1.25;

exec('xinput', (err, output) => {
    if (err) { console.error('mypoint-index.js can\'t execute xinput: ', err); process.exit(1); }
    let outLines = output.split(/\r?\n/);
    outLines.forEach((s) => {
        if (/slave  pointer/.test(s) && !/Virtual core/.test(s)) {
            let mouseName = s.match(/↳ (.*)id=\d+/)[1].trim();
            const cmd1 = `xinput set-prop "${mouseName}" "libinput Accel Speed" -1`;
            exec(cmd1, (err) => {
                if (err) { console.error(`mypoint-index.js can't execute "${cmd1}": `, err); process.exit(1); }
            });
            const cmd2 = `xinput set-prop "${mouseName}" "Coordinate Transformation Matrix" ${mouseSpeed} 0 0 0 ${mouseSpeed} 0 0 0 1`;
            exec(cmd2, (err) => {
                if (err) { console.error(`mypoint-index.js can't execute "${cmd2}": `, err); process.exit(1); }
            });
            }
    });
});