const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split(',')
	.map((x) => x.split('-').map((y) => parseInt(y)));

const tmp = [];
input.forEach((inp) => {
	for (let i = inp[0]; i <= inp[1]; i++) {
		const str = i.toString();
		const part1 = str.substring(0, str.length / 2);
		const part2 = str.substring(str.length / 2);
		if (part1 === part2) {
			tmp.push(i);
		}
	}
});

console.log(
	'1',
	tmp.reduce((com, val) => com + val, 0)
);

const tmp2 = [];
input.forEach((inp) => {
	for (let i = inp[0]; i <= inp[1]; i++) {
		const str = i.toString();
		for (let x = 1; x <= str.length / 2; x++) {
			const reg = new RegExp(str.substring(0, x), 'g');
			const matches = [...str.matchAll(reg)].length;

			if (matches * x === str.length) {
				tmp2.push(i);
				break;
			}
		}
	}
});

console.log(
	'2',
	tmp2.reduce((com, val) => com + val, 0)
);

//48748746459 <- high
