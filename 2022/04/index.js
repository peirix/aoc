const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data
    .toString()
    .split('\n')
    .map(x => x.split(',').map(x => x.split('-').map(x => parseInt(x))));

let total1 = 0;
let total2 = 0;
input.forEach(x => {
    if ((x[0][0] <= x[1][0] && x[0][1] >= x[1][1]) || (x[1][0] <= x[0][0] && x[1][1] >= x[0][1])) {
        total1++;
    }
    if ((x[0][0] >= x[1][0] && x[0][0] <= x[1][1]) || (x[1][0] >= x[0][0] && x[1][0] <= x[0][1])) {
        total2++;
    }
});

console.log(total1);
console.log(total2);
