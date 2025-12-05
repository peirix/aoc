const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => {
		return { dir: x[0], val: parseInt(x.substring(1)) };
	});

let num = 50;
let count = 0;
input.forEach((n) => {
	for (var i = 0; i < n.val; i++) {
		num = (num + (n.dir === 'L' ? -1 : 1)) % 100;
		if (num === 0) count++;
	}
});

console.log(count);
