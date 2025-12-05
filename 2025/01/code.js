const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => {
		return [x[0], parseInt(x.substring(1))];
	});

let num = 50;
let land = 0;
let totPasses = 0;
console.log(`steg\tverdi\tant-0\tant-passert`);
input.forEach((n) => {
	const startAt = num === 0;
	let passes = 0;

	if (n[0] === 'L') {
		num -= n[1];
	} else {
		num += n[1];
	}

	while (num < 0) {
		num += 100;
		if (num !== 0) passes++;
	}
	while (num > 99) {
		num -= 100;
		if (num !== 0) passes++;
	}

	if (startAt && n[0] === 'L') {
		passes--;
	}
	totPasses += passes;

	if (num === 0) {
		land++;
	}
	console.log(`${n[0]}${n[1]}\t${num}\t${land}\t${totPasses}`);
});
console.log(num, land, totPasses, land + totPasses);

//6205
//6675
//6785
//6913
