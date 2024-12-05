const fs = require('fs');
const lcm = require('lcm');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');
console.time('dur');
const steps = input
	.splice(0, 1)[0]
	.split('')
	.map((x) => (x === 'L' ? 0 : 1));
const tunnels = input.splice(1).map((x) => ({
	name: x.substring(0, 3),
	tuns: x.substring(7, 15).split(', ')
}));
let count = 0;
let cur = 'AAA';
while (cur !== 'ZZZ' && count < 10000000) {
	const tunnel = tunnels.find((x) => x.name === cur);
	cur = tunnel.tuns[steps[count % steps.length]];
	count++;
}
console.log('A', count);
console.timeEnd('dur');
console.time('dur');
let curs = tunnels.filter((x) => x.name[2] === 'A');
const nums = [];

curs.forEach((cur) => {
	count = 0;
	while (cur.name[2] !== 'Z' && count < 1000000000) {
		cur = tunnels.find(
			(x) => x.name === cur.tuns[steps[count % steps.length]]
		);
		count++;
	}
	nums.push(count);
});
console.log(nums);
let n = nums.reduce((tot, cur) => lcm(tot, cur), 1);
console.log('B', n);
console.timeEnd('dur');
