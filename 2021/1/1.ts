import { readInput } from '../library';
import consola from 'consola/src/node';

const input = readInput()
	.split('\n')
	.map((x) => parseInt(x, 10));

let prev: number = input[0];
let increases: number = 0;
input.slice(1).forEach((num: number) => {
	if (num > prev) {
		increases++;
	}
	prev = num;
});
consola.log(increases);

