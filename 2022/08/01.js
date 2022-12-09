const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data
    .toString()
    .split('\n')
    .map(x => x.split(''));
console.log(input);
const height = input.length;
const width = input[0].length;

function traverse(val, pos) {
    let vis = [true, true, true, true];
    for (let y = 0; y < height; y++) {
        if (y === pos.y) {
            continue;
        }
        if (input[y][pos.x] >= val) {
            if (y < pos.y) {
                vis[0] = false;
            } else {
                vis[2] = false;
            }
        }
    }
    for (let x = 0; x < width; x++) {
        if (x === pos.x) {
            continue;
        }
        if (input[pos.y][x] >= val) {
            if (x < pos.x) {
                vis[1] = false;
            } else {
                vis[3] = false;
            }
        }
    }
    return vis.filter(v => v).length;
}

let visible = 0;
input.forEach((row, y) => {
    row.forEach((cell, x) => {
        if (y === 0 || x === 0 || y === height - 1 || x === width - 1) {
            visible++;
        } else if (traverse(cell, { x, y })) {
            visible++;
            console.log(cell, y, x);
        }
    });
});

console.log(visible);
