const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => x.split(' ').map((y) => parseInt(y)));

const diffs = input.map((list) =>
	list.map((x, i) => (i > 0 ? x - list[i - 1] : 0)).slice(1)
);
let tot = 0;
diffs.forEach((list) => {
	if (list.filter((x) => x > 3 || x < -3 || x === 0).length > 0) {
		return;
	}
	const plusmin = list.map((x) => Math.abs(x) === x);
	if (
		plusmin.filter((x) => x).length === list.length ||
		plusmin.filter((x) => !x).length === list.length
	) {
		tot++;
	}
});
console.log('A', tot);

const checkNum = (diff, goingup) => {
	return (
		diff === 0 ||
		Math.abs(diff) > 3 ||
		(goingup && diff < 0) ||
		(!goingup && diff > 0)
	);
};
const checkList = (list) => {
	let goingup = list[0] - list[list.length - 1] < 0;
	for (let i = 0; i < list.length - 1; i++) {
		const x = list[i];
		let diff = list[i + 1] - x;
		if (checkNum(diff, goingup)) {
			return i;
		}
	}
	return false;
};
tot = 0;
input.forEach((list, i) => {
	let org = list.slice(0);
	let num = checkList(org);

	if (num !== false) {
		for (let x = 0; x < list.length; x++) {
			org = list.slice(0);
			org.splice(x, 1);
			num = checkList(org);
			if (num === false) {
				break;
			}
		}
	}
	if (num === false) console.log('Y', i, list);
	else console.log('N', i, list);
	if (num === false) tot++;
});
console.log('B', tot, input.length);

//350 høy
//338
//316
//293
