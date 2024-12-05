const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => x.split(': ')[1])
	.map((x) =>
		x.split(' | ').map((y) =>
			y
				.split(' ')
				.filter((z) => z)
				.map((z) => parseInt(z))
		)
	);

let total = 0;
input.forEach((card) => {
	let tmp = 0;
	card[0].forEach((win) => {
		if (card[1].includes(win)) {
			tmp = tmp ? tmp * 2 : 1;
		}
	});
	total += tmp;
});
console.log('A', total);

const mults = input.map(() => 0);
input.forEach((card, i) => {
	let tmp = i + 1;
	mults[i]++;
	card[0].forEach((win) => {
		if (card[1].includes(win)) {
			mults[tmp] += mults[i];
			tmp++;
		}
	});
});
console.log(
	'B',
	mults.reduce((tot, cur) => tot + cur, 0)
);
