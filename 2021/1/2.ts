import { readInput } from '../library';

const input = readInput()
	.split('\n')
	.map((x) => parseInt(x, 10));

let prev: number = 0;
let increases: number = 0;

input.forEach((x: number, i: number) => {
	let total = x;
	total += input[i + 1] + input[i + 2];
	if (prev) {
		if (total > prev) {
			increases++;
		}
	}
	prev = total;
});
console.log(increases);
