import { readInput } from '../library';

const text = readInput();

const test = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const input = text.split('\n');

let genRating = input.slice(0);
let scrubRating = input.slice(0);

function commonBinary(arr: string[], pos: number): number {
	let avgs: number[] = arr[0].split('').map(() => 0);
	arr.forEach((line) => {
		line.split('').forEach((bin, i) => {
			avgs[i] += parseInt(bin, 10);
		});
	});
	console.log(avgs);
	console.log(avgs.map((x) => x / arr.length));
	return avgs.map((x) => Math.round(x / arr.length))[pos];
}

input[0].split('').forEach((x, i) => {
	if (genRating.length > 1) {
		const common = commonBinary(genRating, i);
		genRating = genRating.filter((g) => g[i] === common.toString());
	}
	if (scrubRating.length > 1) {
		const common = commonBinary(scrubRating, i) === 0 ? 1 : 0;
		// console.log(common);
		scrubRating = scrubRating.filter((g) => g[i] === common.toString());
		// console.log(scrubRating);
	}
});

console.log(genRating, scrubRating);
console.log(parseInt(genRating[0], 2) * parseInt(scrubRating[0], 2));
