const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data.toString().split('\n\n');
let indent = '';
const checkStuff = (a, b) => {
    if (typeof a !== typeof b) {
        console.log(indent + '- Mixed types');
        if (typeof a === 'object') {
            b = [b];
        } else {
            a = [a];
        }
        console.log(indent + '- Compare', a, b);
        indent += '  ';
        return checkStuff(a, b);
    } else if (typeof a === 'number') {
        console.log(indent + '- Compare', a, b);
        if (a < b) {
            console.log(indent + '  - Left side is smaller');
            return true;
        } else if (a > b) {
            console.log(indent + '  - Right side is smaller');
            return false;
        }
    } else {
        console.log(indent + '- Compare', a, b);
        indent += '  ';
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (i >= a.length) {
                console.log(indent + '  - Left side ran out');
                return true;
            } else if (i >= b.length) {
                console.log(indent + '  - Right side ran out');
                return false;
            }
            const res = checkStuff(a[i], b[i]);
            if (res === true || res === false) {
                return res;
            }
        }
        indent = indent.substring(0, 2);
    }
};

// console.log('res', checkStuff(eval(input[4].split('\n')[0]), eval(input[4].split('\n')[1])));

let inds = 0;
let allPacks = [];
input.forEach((x, i) => {
    indent = '';
    const a = eval(x.split('\n')[0]);
    const b = eval(x.split('\n')[1]);
    allPacks.push(a, b);
    console.log('== Pair ' + (i + 1) + ' ==');
    // console.log('- Compare', a, b);
    if (checkStuff(a, b)) {
        inds += i + 1;
        console.log(indent + '  - Right order');
    } else {
        console.log(indent + '  - Wrong order');
    }
    console.log(' ');
});
allPacks.push([[2]], [[6]]);
console.log('Part1: ', inds);

allPacks.sort((a, b) => {
    indent = '';
    return checkStuff(a, b) ? -1 : 1;
});
allPacks = allPacks.map(x => JSON.stringify(x));
console.log(
    allPacks.indexOf('[[2]]') + 1,
    allPacks.indexOf('[[6]]') + 1,
    (allPacks.indexOf('[[2]]') + 1) * (allPacks.indexOf('[[6]]') + 1)
);
console.log();
