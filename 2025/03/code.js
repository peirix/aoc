const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');

let tot = 0;
input.forEach((line) => {
	let big = { val: 0, pos: 0 };
	for (let i = 0; i < line.length - 1; i++) {
		if (line[i] > big.val) {
			big.val = line[i];
			big.pos = i;
		}
	}
	let next = 0;
	for (let i = big.pos + 1; i < line.length; i++) {
		next = Math.max(next, line[i]);
	}
	tot += parseInt(big.val + next);
});
console.log('1', tot);

tot = 0;
input.forEach((line) => {
	const nums = [{ val: '0', pos: 0 }];
	for (let i = 12; i--; ) {
		const big = { val: 0, pos: 0 };
		for (let x = nums[nums.length - 1].pos; x < line.length - i; x++) {
			if (line[x] > big.val) {
				big.val = line[x];
				big.pos = x + 1;
			}
		}
		nums.push(big);
	}
	const num = nums.reduce((com, val) => (com += val.val), '');
	tot += parseInt(num);
});
console.log('2', tot);
