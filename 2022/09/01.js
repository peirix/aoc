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
console.log(input);
const hpos = { x: 0, y: 0 };
const tpos = { x: 0, y: 0 };
function updateTail(dir) {
    if (Math.abs(hpos.x - tpos.x) > 1 || Math.abs(hpos.y - tpos.y) > 1) {
        if (dir === 'U' || dir === 'D') {
            tpos.x = hpos.x;
            tpos.y += dir === 'U' ? -1 : 1;
        } else {
            tpos.y = hpos.y;
            tpos.x += dir === 'L' ? -1 : 1;
        }
    }
}
const tailpositions = [];
input.forEach(line => {
    for (let i = 0; i < line.num; i++) {
        switch (line.dir) {
            case 'U':
                hpos.y--;
                break;
            case 'R':
                hpos.x++;
                break;
            case 'D':
                hpos.y++;
                break;
            case 'L':
                hpos.x--;
                break;
        }
        updateTail(line.dir);
        tailpositions.push(`${tpos.x}|${tpos.y}`);
        console.log(hpos, line.dir, tpos);
    }
});
console.log(
    tailpositions.filter((val, i, self) => {
        return self.indexOf(val) === i;
    }).length
);
