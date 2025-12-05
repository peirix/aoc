const startTime = performance.now();
const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
    .toString()
    .split('\n')
    .map(x => x.split(': ').map(y => y.split(' ').map(z => parseInt(z))));

function getOps(length) {
    if (length === 1) return [['+'], ['*'], ['||']];
    const smaller = getOps(length - 1);
    return smaller.flatMap(op => [['+'].concat(op), ['*'].concat(op), ['||'].concat(op)]);
}
const checkLine = (sum, nums) => {
    const ops = getOps(nums.length);
    for (let i = 0; i < ops.length; i++) {
        const tmp = nums.reduce((acc, num, idx) => {
            if (idx === 0) return num;
            switch (ops[i][idx - 1]) {
                case '||':
                    return parseInt(acc + '' + num);
                case '+':
                    return acc + num;
                case '*':
                    return acc * num;
            }
        }, 0);
        if (tmp === sum) {
            return true;
        }
    }

    return false;
};
let tot = 0;
input.forEach(line => {
    const sum = line[0][0];

    if (checkLine(sum, line[1])) {
        tot += sum;
    }
});

console.log('A', tot);
console.log('time', performance.now() - startTime);
