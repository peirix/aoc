const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n');
const rules = { red: 12, green: 13, blue: 14 };
let total = 0;
input.forEach((games, i) => {
	let isValid = true;
	const rounds = games.split(': ')[1].split('; ');

	rounds.forEach((r) => {
		const cubes = r.split(', ');
		cubes.forEach((cube) => {
			const x = cube.split(' ');
			if (x[0] > rules[x[1]]) {
				isValid = false;
			}
		});
	});
	if (isValid) {
		total += i + 1;
	}
});

console.log('A', total);

total = 0;
input.forEach((games) => {
	const rounds = games.split(': ')[1].split('; ');
	const highest = { red: 0, blue: 0, green: 0 };

	rounds.forEach((r) => {
		const cubes = r.split(', ');
		cubes.forEach((cube) => {
			const x = cube.split(' ');
			highest[x[1]] = Math.max(highest[x[1]], x[0]);
		});
	});
	total += highest.red * highest.blue * highest.green;
});

console.log('B', total);
