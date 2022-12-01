import { readInput } from '../library';

const input = readInput();

const test = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

let hor = 0;
let vert = 0;

input
	.split('\n')
	.map((x: string) => {
		const parts = x.split(' ');
		return {
			command: parts[0],
			num: parseInt(parts[1], 10)
		};
	})
	.forEach((step) => {
		switch (step.command) {
			case 'forward':
				hor += step.num;
				break;
			case 'down':
				vert += step.num;
				break;
			case 'up':
				vert -= step.num;
				break;
		}
	});

console.log(hor, vert, hor * vert);
