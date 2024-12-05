const fs = require('fs');
const data = fs.readFileSync('real.txt');

console.time('dur');
const input = data
	.toString()
	.split('\n')
	.map((y) =>
		y
			.split(':')[1]
			.split(' ')
			.filter((x) => x)
			.map((x) => parseInt(x))
	);
const totals = [];
input[0].forEach((t, i) => {
	let total = 0;
	for (let j = 0; j < t; j++) {
		if (j * (t - j) > input[1][i]) {
			total++;
		}
	}
	totals.push(total);
});
console.timeEnd('dur');
console.log(
	'A',
	totals.reduce((tot, cur) => tot * cur, 1)
);

console.time('dur');
const time = parseInt(input[0].join(''));
const dist = parseInt(input[1].join(''));
let total = 0;
for (let i = 0; i < time; i++) {
	if (i * (time - i) > dist) {
		total++;
	}
}
console.timeEnd('dur');
console.log('B', total);
