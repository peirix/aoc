const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => ('..' + x + '..').split(''));
input.push(input[0].map(() => '.'));
input.unshift(input[0].map(() => '.'));

const nbor = (y, x) => {
	const nbors =
		input[y - 1][x - 1] +
		input[y - 1][x] +
		input[y - 1][x + 1] +
		input[y][x - 1] +
		input[y][x + 1] +
		input[y + 1][x - 1] +
		input[y + 1][x] +
		input[y + 1][x + 1];

	return nbors.match(/[^\d.]/);
};

let total = 0;
for (let y = 1; y < input.length - 1; y++) {
	let num = '';
	let foundSymbol = false;
	for (let x = 1; x < input[y].length - 1; x++) {
		if (nbor(y, x) && !isNaN(input[y][x])) {
			foundSymbol = true;
		} else if (num === '') {
			foundSymbol = false;
		}

		if (isNaN(input[y][x])) {
			if (foundSymbol && num !== '') {
				total += parseInt(num);
			}
			num = '';
		} else {
			num += input[y][x];
		}
	}
}

console.log('A', total);

const nborStar = (y, x) => {
	if (input[y - 1][x - 1] === '*') return { y: y - 1, x: x - 1 };
	if (input[y - 1][x] === '*') return { y: y - 1, x };
	if (input[y - 1][x + 1] === '*') return { y: y - 1, x: x + 1 };
	if (input[y][x - 1] === '*') return { y, x: x - 1 };
	if (input[y][x + 1] === '*') return { y, x: x + 1 };
	if (input[y + 1][x - 1] === '*') return { y: y + 1, x: x - 1 };
	if (input[y + 1][x] === '*') return { y: y + 1, x };
	if (input[y + 1][x + 1] === '*') return { y: y + 1, x: x + 1 };

	return false;
};

const list = [];
for (let y = 1; y < input.length - 1; y++) {
	let num = '';
	let foundSymbol = false;
	let pos;
	for (let x = 1; x < input[y].length - 1; x++) {
		if (nborStar(y, x) && !isNaN(input[y][x])) {
			pos = nborStar(y, x);
			foundSymbol = true;
		} else if (num === '') {
			foundSymbol = false;
		}

		if (isNaN(input[y][x])) {
			if (foundSymbol && num !== '') {
				const item = list.find((l) => l.pos === JSON.stringify(pos));
				if (!item) {
					list.push({
						pos: JSON.stringify(pos),
						nums: [parseInt(num)]
					});
				} else {
					item.nums.push(parseInt(num));
				}
			}
			num = '';
		} else {
			num += input[y][x];
		}
	}
}

total = list
	.filter((l) => l.nums.length === 2)
	.reduce((tot, cur) => tot + cur.nums[0] * cur.nums[1], 0);

console.log('B', total);
