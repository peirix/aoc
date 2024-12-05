const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data.toString().split('\n\n');

console.time('dur');
const seeds = input
	.splice(0, 1)[0]
	.split(' ')
	.slice(1)
	.map((x) => parseInt(x));
const seedRanges = [...seeds];
const maps = input.map((x) =>
	x
		.split('\n')
		.slice(1)
		.map((y) => y.split(' ').map((z) => parseInt(z)))
);

maps.forEach((mapList) => {
	seeds.forEach((seed, i) => {
		for (mp of mapList) {
			if (seed >= mp[1] && seed <= mp[1] + mp[2]) {
				seeds[i] += mp[0] - mp[1];
				break;
			}
		}
	});
});
console.timeEnd('dur');

console.log('A', Math.min(...seeds));

let i = 0;
let seed = 0;
maps.reverse();
const max = 1493869;
for (i = 0; i < max; i++) {
	seed = i;
	maps.forEach((mapList) => {
		for (mp of mapList) {
			if (seed >= mp[0] && seed <= mp[0] + mp[2]) {
				seed += mp[1] - mp[0];
				break;
			}
		}
	});
	let found = false;
	for (let j = 0; j < seedRanges.length; j += 2) {
		if (
			seed >= seedRanges[j] &&
			seed <= seedRanges[j] + seedRanges[j + 1]
		) {
			console.log(j);
			found = true;
			break;
		}
	}
	if (found) {
		break;
	}
}

console.log('B', i - 1);
