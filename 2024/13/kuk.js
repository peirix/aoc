const startTime = performance.now();
const fs = require('fs');
const data = fs.readFileSync('test.txt');

const input = data
    .toString()
    .split('\n\n')
    .map(x =>
        x.split('\n').map(y => {
            const nums = y
                .replace(/Button [AB]: /, '')
                .replace('Prize: ', '')
                .replace(/[XY][\+\=]/g, '')
                .split(', ')
                .map(z => parseInt(z));
            return nums;
        })
    );

console.log(input);

function findCombinations(target, x, y) {
    let combinations = [];

    // Iterate over possible values of a
    for (let a = 0; a <= Math.floor(target / x); a++) {
        let remaining = N - a * x;
        if (remaining >= 0 && remaining % y === 0) {
            let b = remaining / y;
            combinations.push({ a, b });
        }
    }

    return combinations;
}

input.forEach(line => {
    const x = findCombinations(line[2][0], line[0][0], line[1][0]);
    const y = findCombinations(line[2][1], line[0][1], line[1][1]);
    console.log(line[2][0], x);
});
