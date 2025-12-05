const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
    .toString()
    .split('\n')
    .map(x => x.split(''));

let pos = [0, 0];
input.forEach((line, y) => {
    if (line.includes('^')) {
        pos = [y, line.indexOf('^')];
    }
});
input[pos[0]][pos[1]] = 'X';
let out = false;
let steps = 0;
let dir = {
    name: 'up',
    x: 0,
    y: -1
};
const checkNext = () => {
    return input[pos[0] + dir.y][pos[1] + dir.x];
};
let stoppers = 0;
const checkAround = () => {
    let posCopy = pos.slice(0);
    const search = { x: 0, y: 0, l: '' };
    switch (dir.name) {
        case 'up':
            search.x = 1;
            search.l = 'r';
            break;
        case 'right':
            search.y = 1;
            search.l = 'd';
            break;
        case 'down':
            search.x = -1;
            search.l = 'l';
            break;
        case 'left':
            search.y = -1;
            search.l = 'u';
    }
    while (true) {
        if (
            posCopy[0] + search.y <= 0 ||
            posCopy[1] + search.x <= 0 ||
            posCopy[0] + search.y >= input[0].length ||
            posCopy[1] + search.x >= input.length
        ) {
            return;
        }
        posCopy[0] += search.y;
        posCopy[1] += search.x;
        const hit = input[posCopy[0]][posCopy[1]];
        if (hit.includes(search.l)) {
            stoppers++;
            return;
        }
        if (hit === '#') {
            return;
        }
    }
};
while (!out) {
    if (steps > 100000) {
        out = true;
    }
    steps++;
    checkAround();
    if (checkNext() === '#') {
        switch (dir.name) {
            case 'up':
                dir = {
                    name: 'right',
                    x: 1,
                    y: 0
                };
                break;
            case 'right':
                dir = {
                    name: 'down',
                    x: 0,
                    y: 1
                };
                break;
            case 'down':
                dir = {
                    name: 'left',
                    x: -1,
                    y: 0
                };
                break;
            case 'left':
                dir = {
                    name: 'up',
                    x: 0,
                    y: -1
                };
        }
    } else {
        pos[0] += dir.y;
        pos[1] += dir.x;
        input[pos[0]][pos[1]] += dir.name[0];
    }

    if (pos[0] + dir.y < 0 || pos[1] + dir.x < 0 || pos[0] + dir.y >= input[0].length || pos[1] + dir.x >= input.length) {
        out = true;
    }
}

let tot = 0;
input.forEach(line => {
    // console.log(line.join(''));
    tot += line.filter(x => x.match(/u|r|d|l/)).length;
});
console.log('A', tot);
console.log('B', stoppers);

//486 low
