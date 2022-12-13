const fs = require('fs');
const aStar = require('a-star');
const data = fs.readFileSync('real.txt');
const input = data.toString().split('\n');
const manhattanDistance = function (a, b) {
    return Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]);
};
var planarNeighbors = function (xy) {
    var x = xy[0],
        y = xy[1];
    return [
        [x - 1, y + 0],
        [x + 0, y - 1],
        [x + 0, y + 1],
        [x + 1, y + 0]
    ];
};

let end;
for (y = 0; y < input.length; y++) {
    var endX = input[y].indexOf('E');
    if (endX !== -1) {
        end = [endX, y];
        break;
    }
}
const map = input.map(y =>
    y.split('').map(x => x.replace('S', 'a').replace('E', 'z').charCodeAt(0))
);
const checkCost = start => {
    const res = aStar({
        start,
        isEnd: function (n) {
            return n[0] === end[0] && n[1] === end[1];
        },
        neighbor: function (pos) {
            let val = map[pos[1]][pos[0]];
            return planarNeighbors(pos).filter(xy => {
                if (map[xy[1]] && map[xy[1]][xy[0]]) {
                    return val + 1 >= map[xy[1]][xy[0]];
                }
                return false;
            });
        },
        heuristic: function (xy) {
            return manhattanDistance(xy, end);
        },
        distance: () => 1
    });
    // console.log(res.status);

    return res;
};
const costs = [];
input.forEach((row, y) => {
    row.split('').forEach((c, x) => {
        if (c === 'a') {
            const res = checkCost([x, y]);
            if (res.status === 'success') {
                costs.push(res.cost);
            }
        }
    });
});
console.log(input[40].split('')[106], end);
console.log('Part1', checkCost([0, 0]).cost);
console.log('Part2', Math.min(...costs));
