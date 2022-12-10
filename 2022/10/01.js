const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data
    .toString()
    .split('\n')
    .map(x => {
        return {
            dir: x.split(' ')[0],
            num: parseInt(x.split(' ')[1])
        };
    });

let cycle = 0;
let x = 1;
let tot = 0;
let crt = [];
let crtX = 0;
console.log('........................................');

addCycle = () => {
    if (x === crtX || x - 1 === crtX || x + 1 === crtX) {
        crt.push('#');
    } else {
        crt.push('.');
    }
    cycle++;
    crtX++;
    // console.log(cycle, x);
    if (crt.length === 40) {
        console.log(crt.join(''));
        crt = [];
        crtX = 0;
    }

    if ((cycle % 40) + 20 === 40) {
        tot += cycle * x;
        // console.log(cycle, x);
    }
};

input.forEach(i => {
    addCycle();
    if (i.num) {
        addCycle();
        x += i.num;
    }
});
console.log('........................................');
console.log('Part1:', tot);
