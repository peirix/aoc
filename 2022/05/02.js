const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data
    .toString()
    .split('\n\n')
    .map(x => x.split('\n'));
const crates = [];

function addToStack(i, val) {
    crates[i] = crates[i] || [];
    val = val.substr(i * 4 + 1, 1);
    if (val.trim() && isNaN(val)) {
        crates[i].push(val);
    }
}

input[0].forEach(x => {
    for (let i = 0; i < 9; i++) {
        addToStack(i, x);
    }
});

input[1].forEach(x => {
    const parts = x
        .replace(/ /g, '')
        .replace('move', '')
        .replace('from', ',')
        .replace('to', ',')
        .split(',')
        .map(x => parseInt(x));

    const c = crates[parts[1] - 1].splice(0, parts[0]);
    crates[parts[2] - 1].unshift(...c);
});
console.log(crates);
console.log(crates.map(c => c[0]).join(''));
