const startTime = performance.now();
const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
    .toString()
    .split(' ')
    .map(x => parseInt(x));

let nums = input.slice(0);
for (let runs = 0; runs < 25; runs++) {
    const tmp = [];
    nums.forEach((num, i) => {
        const numstr = num.toString();
        if (num === 0) {
            tmp.push(1);
        } else if (numstr.length % 2 === 0) {
            tmp.push(parseInt(numstr.substring(0, numstr.length / 2)));
            tmp.push(parseInt(numstr.substring(numstr.length / 2)));
        } else {
            tmp.push(nums[i] * 2024);
        }
    });
    nums = tmp;
}
console.log('A', nums.length, performance.now() - startTime);
const medTime = performance.now();
let dist = [];
input.forEach(num => {
    dist.push({
        num,
        count: 1
    });
});

for (let i = 0; i < 75; i++) {
    const tmp = [];
    for (let j = 0; j < dist.length; j++) {
        const x = dist[j];
        if (x.count === 0) {
            continue;
        }
        const newNums = [];
        const numstr = x.num.toString();

        if (x.num === 0) {
            newNums.push(1);
        } else if (numstr.length % 2 === 0) {
            newNums.push(parseInt(numstr.substring(0, numstr.length / 2)));
            newNums.push(parseInt(numstr.substring(numstr.length / 2)));
        } else {
            newNums.push(x.num * 2024);
        }
        newNums.forEach(num => {
            const up = tmp.find(d => d.num === num);
            if (up) {
                up.count += x.count;
            } else {
                tmp.push({
                    num,
                    count: x.count
                });
            }
        });
    }
    dist = tmp;
}
const tot = dist.reduce((tot, cur) => tot + cur.count, 0);
console.log('B', tot, performance.now() - medTime);
