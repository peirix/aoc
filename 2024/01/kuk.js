const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');
const left = input
	.map((x) => parseInt(x.split('  ')[0]))
	.sort((a, b) => (a > b ? 1 : -1));
const right = input
	.map((x) => parseInt(x.split('  ')[1]))
	.sort((a, b) => (a > b ? 1 : -1));

let tot = 0;
left.forEach((x, i) => {
	tot += Math.abs(x - right[i]);
});
console.log('A', tot);

let sim = 0;
left.forEach((x) => {
	sim += right.filter((r) => r === x).length * x;
});
console.log('B', sim);
