import { readInput } from '../library';

const input = readInput();

const test = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

type Step = {
	command: string;
	num: number;
};

let hor = 0;
let vert = 0;
let aim = 0;

input
	.split('\n')
	.map((x: string): Step => {
		const parts = x.split(' ');
		return {
			command: parts[0],
			num: parseInt(parts[1], 10)
		};
	})
	.forEach((step: Step) => {
		switch (step.command) {
			case 'forward':
				hor += step.num;
				vert += aim * step.num;
				break;
			case 'down':
				aim += step.num;
				break;
			case 'up':
				aim -= step.num;
				break;
		}
	});

console.log(hor, vert, hor * vert);
