const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');
let total = 0;
input.forEach((i) => {
	const nums = i.replace(/\D/g, '');
	total += nums[0] + nums[nums.length - 1] - 0;
});
console.log('a', total);

total = 0;
const conv = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine'
];
input.forEach((inp) => {
	let nums = [];
	for (let i = 0, len = inp.length; i < len; i++) {
		if (isNaN(inp[0])) {
			conv.forEach((text, j) => {
				if (inp.indexOf(text) === 0) {
					nums.push(j);
				}
			});
		} else {
			nums.push(inp[0]);
		}
		inp = inp.substring(1);
	}
	total += parseInt(nums[0] + '' + nums[nums.length - 1]);
});
console.log('b', total);
