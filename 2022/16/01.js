const fs = require('fs');
const data = fs.readFileSync('test.txt');

const input = data
    .toString()
    .split('\n')
    .map(x => x.split(';'));
const map = [];
input.forEach(i => {
    const name = i[0].substring(6, 8);
    const rate = parseInt(i[0].substring(i[0].indexOf('=') + 1));
    const valves = i[1].replace(/,/g, '').split(' ').slice(5);
    map.push({
        name,
        rate,
        valves
    });
});

console.log(map);
let mins = 30;
let cur = map[0];
let pressure = 0;
const open = [];

while (mins > 0) {
    if (cur.rate > 0 && open.indexOf(cur.name) === -1) {
        mins--;
        open.push(cur.name);
        pressure += cur.rate * mins;
    }

    cur = map.find(m => m.name === cur.valves[0]);
    mins--;
    console.log({ mins, cur, pressure });
}
console.log({ mins, cur, pressure });
