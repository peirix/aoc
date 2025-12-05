const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => x.split(''));

const getChar = (y, x) => {
	if (y === -1 || x === -1) return '.';
	if (y === input.length || x === input[0].length) return '.';
	return input[y][x] || '.';
};

const checkSurrounding = (y, x) => {
	let num = 0;
	if (getChar(y - 1, x - 1) === '@') num++;
	if (getChar(y - 1, x) === '@') num++;
	if (getChar(y - 1, x + 1) === '@') num++;
	if (getChar(y, x - 1) === '@') num++;
	if (getChar(y, x + 1) === '@') num++;
	if (getChar(y + 1, x - 1) === '@') num++;
	if (getChar(y + 1, x) === '@') num++;
	if (getChar(y + 1, x + 1) === '@') num++;
	return num;
};

const checkEm = () => {
	let num = 0;
	const poses = [];
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (input[y][x] === '@') {
				if (checkSurrounding(y, x) < 4) {
					num++;
					poses.push({ y, x });
				}
			}
		}
	}
	poses.forEach((p) => {
		input[p.y][p.x] = 'x';
	});
	return num;
};
let num = checkEm();
console.log('1', num);

let next = 0;
let count = 0;
do {
	next = checkEm();
	num += next;
	console.log(count, next);
	count++;
} while (next !== 0);

console.log('2', num);
