const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
    .toString()
    .split('\n')
    .map(x => x.split(''));

const getCell = (x, y) => {
    if (x < 0 || y < 0 || x > input[0].length - 1 || y > input.length - 1) {
        return '.';
    }
    return input[y][x];
};
const totalXmas = (x, y) => {
    let tot = 0;
    if (getCell(x - 1, y - 1) === 'M' && getCell(x - 2, y - 2) === 'A' && getCell(x - 3, y - 3) === 'S') tot++;
    if (getCell(x, y - 1) === 'M' && getCell(x, y - 2) === 'A' && getCell(x, y - 3) === 'S') tot++;
    if (getCell(x + 1, y - 1) === 'M' && getCell(x + 2, y - 2) === 'A' && getCell(x + 3, y - 3) === 'S') tot++;
    if (getCell(x + 1, y) === 'M' && getCell(x + 2, y) === 'A' && getCell(x + 3, y) === 'S') tot++;
    if (getCell(x + 1, y + 1) === 'M' && getCell(x + 2, y + 2) === 'A' && getCell(x + 3, y + 3) === 'S') tot++;
    if (getCell(x, y + 1) === 'M' && getCell(x, y + 2) === 'A' && getCell(x, y + 3) === 'S') tot++;
    if (getCell(x - 1, y + 1) === 'M' && getCell(x - 2, y + 2) === 'A' && getCell(x - 3, y + 3) === 'S') tot++;
    if (getCell(x - 1, y) === 'M' && getCell(x - 2, y) === 'A' && getCell(x - 3, y) === 'S') tot++;
    return tot;
};

const totalMas = (x, y) => {
    if (
        ((getCell(x - 1, y - 1) === 'M' && getCell(x + 1, y + 1) === 'S') ||
            (getCell(x - 1, y - 1) === 'S' && getCell(x + 1, y + 1) === 'M')) &&
        ((getCell(x + 1, y - 1) === 'M' && getCell(x - 1, y + 1) === 'S') ||
            (getCell(x + 1, y - 1) === 'S' && getCell(x - 1, y + 1) === 'M'))
    )
        return 1;
    return 0;
};

let xmas = 0;
let mas = 0;
input.forEach((line, y) => {
    line.forEach((lett, x) => {
        if (lett === 'X') {
            xmas += totalXmas(x, y);
        } else if (lett === 'A') {
            mas += totalMas(x, y);
        }
    });
});
console.log('A', xmas);
console.log('B', mas);
