const startTime = performance.now();
const fs = require('fs');
const data = fs.readFileSync('test.txt');

const input = data
    .toString()
    .split('')
    .map(x => parseInt(x));

let checksum = [];
input.forEach((num, i) => {
    for (let x = 0; x < num; x++) {
        checksum.push(i % 2 ? '.' : i / 2);
    }
});
let checksumB = checksum.slice(0);
for (let i = checksum.length; i--; ) {
    if (checksum[i] === '.') continue;
    const pos = checksum.indexOf('.');
    if (pos > i) continue;
    checksum[pos] = checksum[i];
    checksum[i] = '.';
}
let check = checksumB.slice(-1)[0];
let dots = '.';
let lets = check;
let amount = 1;
// console.log(checksumB.join(''), check);
for (let i = checksumB.length - 1; i--; ) {
    const tmpCheck = checksumB.map(x => (x === '.' ? x : 'X')).join('');
    if (checksumB[i] === check) {
        amount++;
        dots += '.';
        lets += check;
    } else if (checksumB[i] === '.') {
        continue;
    } else {
        const pos = tmpCheck.indexOf(dots);
        if (pos > -1 && pos < i) {
            const letPos = checksumB.indexOf(check);
            for (let x = 0; x < dots.length; x++) {
                checksumB[pos + x] = check;
                checksumB[letPos + x] = '.';
            }
        }
        if (checksumB[i] < check) {
            check = checksumB[i];
            dots = '.';
            lets = check;
            amount = 1;
        }
        // console.log(checksumB.join(''), check, dots, lets);
    }
}
let tot = 0;
checksum
    .filter(x => x !== '.')
    .forEach((num, i) => {
        tot += num * i;
    });
console.log('A', tot);
tot = 0;

checksumB.forEach((let, i) => {
    if (let !== '.') tot += let * i;
});
console.log('B', tot);
console.log('time', performance.now() - startTime);
//6357555455690 low
//6360363631231 high
