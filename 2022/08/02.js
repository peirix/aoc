const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data
    .toString()
    .split('\n')
    .map(x => x.split(''));
console.log(input);
const height = input.length;
const width = input[0].length;

function walk(start, end, dir, pos) {
    const check = { ...pos };
    if (end > start) {
        for (let i = start; i < end; i++) {
            check[dir] = i;
            if (input[check.y][check.x] >= input[pos.y][pos.x]) {
                return i - start + 1;
            }
        }
        return end - start;
    } else {
        for (let i = start; i >= end; i--) {
            check[dir] = i;
            if (input[check.y][check.x] >= input[pos.y][pos.x]) {
                return start - i + 1;
            }
        }
        return start - end + 1;
    }
}

function traverse(val, pos) {
    let vis = [0, 0, 0, 0];
    vis[0] = walk(pos.y - 1, 0, 'y', pos);
    vis[1] = walk(pos.x + 1, width, 'x', pos);
    vis[2] = walk(pos.y + 1, height, 'y', pos);
    vis[3] = walk(pos.x - 1, 0, 'x', pos);
    return vis[0] * vis[1] * vis[2] * vis[3];
}

// traverse(5, { x: 2, y: 3 });
let scores = [];
input.forEach((row, y) => {
    row.forEach((cell, x) => {
        if (y === 0 || x === 0 || y === height - 1 || x === width - 1) {
            scores.push(0);
        } else {
            scores.push(traverse(cell, { x, y }));
        }
    });
});

console.log(Math.max(...scores));
