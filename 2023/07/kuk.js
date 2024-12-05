const fs = require('fs');
const data = fs.readFileSync('real.txt');
const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
console.time('dur');
const getTypeA = (hand) => {
	hand = hand.split('');
	const tmp = [];
	for (let i = 0; i < hand.length; i++) {
		const occurences = hand.filter((x) => x === hand[i]).length;
		if (occurences === 5) {
			return 7;
		} else if (occurences === 4) {
			return 6;
		} else if (occurences === 3) {
			tmp[hand[i]] = 3;
		} else if (occurences === 2) {
			tmp[hand[i]] = 2;
		}
	}
	const tot = Object.values(tmp).reduce((tot, cur) => tot + cur, 0);
	if (tot === 3) {
		return 4;
	} else if (tot === 4) {
		return 3;
	}
	return Math.max(tot, 1);
};
const getTypeB = (hand) => {
	hand = hand.split('');
	const tmp = [];
	if (hand.indexOf('J') > -1) {
		if (hand.filter((x) => x === 'J').length === 5) {
			return 7;
		}
	}
	for (let i = 0; i < hand.length; i++) {
		const occurences = hand.filter((x) => x === hand[i]).length;
		tmp[hand[i]] = occurences;
	}

	let tot = 0;
	let vals = Object.values(tmp);
	if (tmp['J'] === 1) {
		vals = vals.filter((x) => x > 1);
		if (vals.length === 2 && vals[0] === 2 && vals[1] === 2) {
			tot = 5;
		}
	}
	if (tot === 0) {
		const extra = tmp['J'];
		tmp['J'] = 0;
		vals = Object.values(tmp);
		tot = Math.max(...vals) + extra;
		if (tot === 5) {
			tot = 7;
		} else if (tot === 4) {
			tot = 6;
		} else if (tot === 3) {
			tot = 4;
		} else if (tot === 2) {
			tot = 2;
		}
	}
	return tot;
};
const input = data
	.toString()
	.split('\n')
	.map((x) => x.split(' '))
	.sort((a, b) => {
		const typeA = a[0].indexOf('J') > -1 ? getTypeB(a[0]) : getTypeA(a[0]);
		const typeB = b[0].indexOf('J') > -1 ? getTypeB(b[0]) : getTypeA(b[0]);
		a[2] = typeA;
		b[2] = typeB;
		if (typeA > typeB) {
			return 1;
		} else if (typeA < typeB) {
			return -1;
		}
		for (let i = 0; i < a[0].length; i++) {
			console.log(a[0], a[0][i], cards.indexOf(a[0][i]));
			console.log(b[0], a[0][i], cards.indexOf(b[0][i]));
			if (cards.indexOf(a[0][i]) > cards.indexOf(b[0][i])) {
				return -1;
			} else if (cards.indexOf(a[0][i]) < cards.indexOf(b[0][i])) {
				return 1;
			}
		}
	});
console.log(input);
console.log(input.reduce((tot, cur, i) => tot + cur[1] * (i + 1), 0));
console.timeEnd('dur');
