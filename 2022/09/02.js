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
const knots = [];
for (let i = 0; i < 10; i++) {
    knots.push({ x: 0, y: 0 });
}
console.log(knots);
function updateTail(i) {
    const diffX = Math.abs(knots[i].x - knots[i - 1].x);
    const diffY = Math.abs(knots[i].y - knots[i - 1].y);
    if (diffX > 1 || diffY > 1) {
        if (diffY === diffX) {
            knots[i].x += knots[i - 1].x > knots[i].x ? 1 : -1;
            knots[i].y += knots[i - 1].y > knots[i].y ? 1 : -1;
        } else if (diffY > diffX) {
            knots[i].x = knots[i - 1].x;
            knots[i].y += knots[i - 1].y > knots[i].y ? 1 : -1;
        } else {
            knots[i].y = knots[i - 1].y;
            knots[i].x += knots[i - 1].x > knots[i].x ? 1 : -1;
        }
    }
}
const tailpositions = [];
input.forEach(line => {
    for (let i = 0; i < line.num; i++) {
        switch (line.dir) {
            case 'U':
                knots[0].y--;
                break;
            case 'R':
                knots[0].x++;
                break;
            case 'D':
                knots[0].y++;
                break;
            case 'L':
                knots[0].x--;
                break;
        }
        for (let i = 1; i < knots.length; i++) {
            updateTail(i);
        }
        tailpositions.push(`${knots[knots.length - 1].x}|${knots[knots.length - 1].y}`);
    }
});
console.log(
    tailpositions.filter((val, i, self) => {
        return self.indexOf(val) === i;
    }).length
);
