const input = ``;
const testInput = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

const test2 = `0: 1 2
1: "a"
2: 1 3 | 3 1
3: "b"

aab
aba
aaa
bbb`;

const parts = test2.split('\n\n');
const rules = parts[0].split('\n').map((r) => r.substr(3));
const msgs = parts[1].split('\n');

const valids = [];

rules[0].split(' ').forEach((rule, ind) => {
	getChar(rule, ind);
});

function getChar(i, j) {
	const rule = rules[i];
	if (rule.includes('"')) {
		return rule.replace('"', '');
	} else if (rule.includes('|')) {
		//2 3 | 3 2
		const sub = rule.split(' ');
		valids.push([getChar(sub[0]), getChar(sub[3])]);
		valids.push([getChar(sub[1]), getChar(sub[4])]);
	} else {
		//2 3
		const sub = rule.split(' ');
		valids.push([getChar(sub[0])]);
		valids.push([getChar(sub[1])]);
	}
}

console.log(valids);

let total = 0;
msgs.forEach((msg) => {
	let valid = true;
	for (let i = 0; i < msg.length; i++) {
		if (!valids[i].includes(msg.charAt(i))) {
			valid = false;
			break;
		}
	}
	if (valid) {
		total++;
	}
});
