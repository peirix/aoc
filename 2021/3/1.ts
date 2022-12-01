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

let avgs: number[] = input[0].split('').map(() => 0);

input.forEach((step) => {
	step.split('').forEach((bin, i) => {
		avgs[i] += parseInt(bin, 10);
	});
});

avgs = avgs.map((x) => x / input.length);
console.log(avgs);
const gamma = avgs.map((x) => Math.round(x)).join('');
const epsilon = avgs.map((x) => Math.round(Math.abs(1 - x))).join('');
console.log(gamma, epsilon);
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
