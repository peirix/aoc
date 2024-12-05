const fs = require('fs');
const data = fs.readFileSync('test.txt');
const input = data
    .toString()
    .split('\n')
    .map(x => x.split(' -> ').map(y => y.split(',').map(z => parseInt(z))));
console.log(input);

for (let i = 0; i < 10; i++) {}
