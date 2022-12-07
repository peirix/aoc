const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data.toString().split('\n');
const structure = [{ name: '/', dirs: [], files: [], parent: null, size: 0 }];
let curFolder = {};
let totalSize = 0;
input.forEach(cmd => {
    const parts = cmd.split(' ');
    if (parts[0] === '$') {
        if (parts[1] === 'cd') {
            if (parts[2] === '/') {
                curFolder = structure[0];
            } else if (parts[2] === '..') {
                curFolder = structure.find(s => s.name === curFolder.parent);
            } else {
                curFolder = structure.find(s => s.name === curFolder.name + '/' + parts[2]);
            }
        }
    } else {
        if (parts[0] === 'dir') {
            structure.push({
                name: curFolder.name + '/' + parts[1],
                files: [],
                size: 0,
                parent: curFolder.name
            });
        } else {
            const size = parseInt(parts[0]);
            curFolder.files.push({
                size,
                name: parts[1]
            });
            curFolder.size += size;
            totalSize += size;
        }
    }
});

function getSubfolderSize(folder) {
    let total = 0;
    const subfolders = structure.filter(s => s.parent === folder);
    subfolders.forEach(sub => {
        sub.size += getSubfolderSize(sub.name);
        total += sub.size;
    });
    // console.log(folder, total);
    return total;
}
structure[0].size += getSubfolderSize(structure[0].name);

console.log(
    'Part1',
    structure
        .filter(s => s.size <= 100000)
        .map(f => f.size)
        .reduce((tot, cur) => tot + cur, 0)
);

const req = 30000000 - (70000000 - structure[0].size);
console.log('Part2', Math.min(...structure.filter(s => s.size >= req).map(s => s.size)));
