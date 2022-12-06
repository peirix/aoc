const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data.toString().split('');

let check = input.splice(0, 4);
let index = 0;
let counter = 4;
while (index === 0) {
    counter++;
    check.shift();
    check.push(input.shift());
    if (
        check.filter((v, i, s) => {
            return s.indexOf(v) === i;
        }).length === 4
    ) {
        index = counter;
    }
}

console.log(check, index);
