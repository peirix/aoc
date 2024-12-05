const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString();

const regex = /(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/g;

let tot = 0;
console.log(input.match(regex));
let calc = true;
input.match(regex).forEach((m) => {
	if (m.includes('do()')) {
		calc = true;
	} else if (m.includes("don't()")) {
		calc = false;
	} else if (calc) {
		const nums = m.replace('mul(', '').split(',');
		console.log(m, nums);
		tot += nums[0] * nums[1].replace(')', '');
	}
});
console.log('A', tot);
