const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n\n')
	.map((x) => x.split('\n'));

const rules = input[0].map((x) => x.split('|').map((y) => parseInt(y)));
const outs = input[1].map((x) => x.split(',').map((y) => parseInt(y)));
const rulesForNum = (num) => {
	return {
		before: rules.filter((r) => r[0] === num).map((x) => x[1]),
		after: rules.filter((r) => r[1] === num).map((x) => x[0])
	};
};

let totA = 0;
let totB = 0;
outs.forEach((o) => {
	let work = true;
	o.forEach((num, i) => {
		const numRules = rulesForNum(num);
		numRules.before.forEach((x) => {
			if (o.includes(x) && o.indexOf(x) < i) {
				work = false;
			}
		});
		numRules.after.forEach((x) => {
			if (o.includes(x) && o.indexOf(x) > i) {
				work = false;
			}
		});
	});
	if (work) {
		totA += o[Math.floor(o.length / 2)];
	} else {
		o.sort((a, b) => {
			if (rulesForNum(a).before.includes(b)) {
				return -1;
			} else if (rulesForNum(a).after.includes(b)) {
				return 1;
			}
		});
		totB += o[Math.floor(o.length / 2)];
	}
});

console.log('A', totA);
console.log('B', totB);
