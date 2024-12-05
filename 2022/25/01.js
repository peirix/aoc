const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');
const decMap = {
    '=': -2,
    '-': -1,
    0: 0,
    1: 1,
    2: 2
};
const snafuMap = {
    '-2': '=',
    '-1': '-',
    0: '0',
    1: '1',
    2: '2'
};
let all = 0;
input.forEach(line => {
    let mult = 1;
    let total = 0;
    line.split('')
        .reverse()
        .forEach(x => {
            // console.log(x, i);
            const dec = decMap[x];
            // console.log(dec);
            total += dec * mult;
            mult *= 5;
        });
    console.log(total);
    all += total;
    return;
});

function decToSnafu(num) {
    let result = '';
    let remaining = num;
    while (remaining > 0) {
        const cur = ((remaining + 2) % 5) - 2;
        remaining = Math.floor((remaining + 2) / 5);
        result = snafuMap[cur] + result;
    }
    return result;
}

console.log(decToSnafu(all));
