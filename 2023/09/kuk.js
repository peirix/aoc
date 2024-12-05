const fs = require('fs');
const data = fs.readFileSync('real.txt');

const input = data
	.toString()
	.split('\n')
	.map((x) => x.split(' ').map((y) => parseInt(y)));

const newNums = [];
input.forEach((line) => {
	let nextLine = [...line];
	let count = 0;
	const allLines = [line];
	while (
		nextLine.filter((x) => x === 0).length !== nextLine.length &&
		count < 100
	) {
		const tmp = [];
		for (let i = 0; i < nextLine.length - 1; i++) {
			tmp.push(nextLine[i + 1] - nextLine[i]);
		}
		allLines.push(tmp);
		nextLine = tmp;
		count++;
	}
	let prevNum = 0;
	// Part 1:
	// allLines[allLines.length - 1].push(0);
	// for (let i = allLines.length - 1; i >= 0; i--) {
	// 	prevNum = allLines[i].slice(-1)[0] + prevNum;
	// 	allLines[i].push(prevNum);
	// }
	// Part 2
	allLines[allLines.length - 1].unshift(0);
	for (let i = allLines.length - 1; i >= 0; i--) {
		prevNum = allLines[i][0] - prevNum;
		allLines[i].unshift(prevNum);
	}
	// console.log(allLines);
	newNums.push(prevNum);
});

console.log(newNums.reduce((tot, cur) => tot + cur, 0));
