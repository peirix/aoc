const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
    .toString()
    .split('\n\n')
    .map(x => x.split('\n'))
    .map(x =>
        x.reduce((tot, cur) => {
            return tot + parseInt(cur);
        }, 0)
    );

let total = 0;
for (let i = 0; i < 3; i++) {
    const max = Math.max(...input);
    input.splice(input.indexOf(max), 1);
    total += max;
}
console.log(total);
