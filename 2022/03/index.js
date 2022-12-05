const fs = require('fs');
const data = fs.readFileSync('real.txt');
let all = 'abcdefghijklmnopqrstuvwxyz';
all += all.toUpperCase();

const input1 = data
    .toString()
    .split('\n')
    .map(x => [x.substring(0, x.length / 2), x.substring(x.length / 2)]);

const input2 = data.toString().split('\n');

let total = 0;

input1.forEach(x => {
    let found = false;
    x[0].split('').forEach(l => {
        if (found) return;
        if (x[1].includes(l)) {
            found = true;
            total += all.indexOf(l) + 1;
        }
    });
});

console.log(`Part1: ${total}`);

function findCommon(a, b, c) {
    // three sets to maintain frequency of elements
    let uset = new Set();
    let uset2 = new Set();
    let uset3 = new Set();
    for (let i = 0; i < a.length; i++) {
        uset.add(a[i]);
    }
    for (let i = 0; i < b.length; i++) {
        uset2.add(b[i]);
    }
    // checking if elements of 3rd array are present in first 2 sets
    for (let i = 0; i < c.length; i++) {
        if (uset.has(c[i]) && uset2.has(c[i])) {
            // using a 3rd set to prevent duplicates
            if (!uset3.has(c[i])) {
                return c[i];
            }
            uset3.add(c[i]);
        }
    }
}
total = 0;
for (let i = 0; i < input2.length; i += 3) {
    const letter = findCommon(input2[i], input2[i + 1], input2[i + 2]);
    total += all.indexOf(letter) + 1;
}

console.log(`Part2: ${total}`);
