const input = `1008832
23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,991,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17`;
const testInput = `939
7,13,x,x,59,x,31,19`;

const lines = input.split('\n');
const stamp = lines[0];
let buses = lines[1]
	.split(',')
	.filter((b) => b !== 'x')
	.map((b) => parseInt(b));

let lowest = {
	bus: 9999999999999,
	stamp: 9999999999999
};
buses.forEach((bus) => {
	let tmp = bus * Math.ceil(stamp / bus);
	if (tmp < lowest.stamp) {
		lowest.bus = bus;
		lowest.stamp = tmp;
	}
});
console.log('Part 1', (lowest.stamp - stamp) * lowest.bus);

const deps = lines[1]
	.split(',')
	.map((b, i) => {
		if (b === 'x') return null;
		return {
			id: parseInt(b),
			t: i
		};
	})
	.filter((b) => b);
deps.sort((a, b) => (a.id > b.id ? -1 : 1));
console.log(buses);

let i = 0;
let counter = 0;
let found = false;
const off = deps[0].t;

console.time('searching');
while (!found) {
	counter++;
	let tmp = true;
	i += deps[0].id;
	for (let j = 1; j < deps.length; j++) {
		if ((i + deps[j].t - off) % deps[j].id) {
			tmp = false;
			break;
		}
	}
	if (tmp) {
		for (let j = 0; j < deps.length; j++) {
			console.log(i + deps[j].t, deps[j].id);
		}
		break;
	}
	if (i > 1000000000000000) {
		console.timeEnd('searching');
		break;
	}
}
console.log(i - off);
//645338524823718