const fs = require('fs');
const data = fs.readFileSync('real.txt');

const cond1 = {
    X: { A: 4, B: 1, C: 7 },
    Y: { A: 8, B: 5, C: 2 },
    Z: { A: 3, B: 9, C: 6 }
};
const cond2 = {
    A: { X: 3, Y: 4, Z: 8 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 2, Y: 6, Z: 7 }
};

const input = data
    .toString()
    .split('\n')
    .map(x => x.split(' '));

const tot1 = input.reduce((tot, cur) => {
    return tot + cond1[cur[1]][cur[0]];
}, 0);
console.log(`1: ${tot1}`);
const tot2 = input.reduce((tot, cur) => {
    return tot + cond2[cur[0]][cur[1]];
}, 0);
console.log(`1: ${tot2}`);
