const fs = require('fs');
const data = fs.readFileSync('test.txt');

const regex = /x=(\-?\d*), y=(\-?\d*)/;
const getxy = val => {
    const m = regex.exec(val);
    console.log(val, m);
    return {
        x: parseInt(m[1]),
        y: parseInt(m[2])
    };
};
const input = data
    .toString()
    .split('\n')
    .map(x => x.split(':').map(y => getxy(y)));

console.log(input);
