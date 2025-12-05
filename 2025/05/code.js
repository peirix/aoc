const startTime = performance.now();
const fs = require('fs');
const real = true;
const data = fs.readFileSync(real ? 'real.txt' : 'test.txt');

const input = data
	.toString()
	.split('\n\n')
	.map((x) => x.split('\n'));

const valids = input[0].map((x) => x.split('-').map((y) => parseInt(y)));

const ids = input[1].map((x) => parseInt(x));

let count = 0;
ids.forEach((id) => {
	for (let i = 0; i < valids.length; i++) {
		if (id >= valids[i][0] && id <= valids[i][1]) {
			count++;
			return;
		}
	}
});
console.log('1', count);
const clone = JSON.parse(JSON.stringify(valids));

valids.sort((a, b) => {
	return a[0] - b[0];
});
if (!real) console.log(valids);
for (let i = 1; i < valids.length; i++) {
	if (valids[i][0] <= valids[i - 1][1]) {
		valids[i][0] = Math.min(valids[i - 1][1], valids[i][1]) + 1;
	}
	if (valids[i][0] > valids[i][1]) {
		valids.splice(i, 1);
		i--;
		continue;
	}
	if (valids[i][0] >= valids[i - 1][0] && valids[i][1] <= valids[i - 1][1]) {
		valids.splice(i, 1);
		i--;
		continue;
	}
}
if (!real) console.log(valids);
const thisn = valids.reduce((com, val) => (com += val[1] - val[0] + 1), 0);
console.log('2', thisn);
console.log('time', performance.now() - startTime);

if (!real) {
	console.log('clone', clone);
	let nums = [];
	clone.forEach((v) => {
		for (let i = v[0]; i <= v[1]; i++) {
			if (nums.includes(i)) continue;
			nums.push(i);
		}
	});
	console.log(nums, nums.length);
}

//327852850042814 <- low
//357674099117252
//357674099117260
//357674099117265
//357674099117276
//357674099117277
//357674099117326
//357945263409047
//358139828292732 <- high
