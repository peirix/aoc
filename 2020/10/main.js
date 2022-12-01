const input = `71
30
134
33
51
115
122
38
61
103
21
12
44
129
29
89
54
83
96
91
133
102
99
52
144
82
22
68
7
15
93
125
14
92
1
146
67
132
114
59
72
107
34
119
136
60
20
53
8
46
55
26
126
77
65
78
13
108
142
27
75
110
90
35
143
86
116
79
48
113
101
2
123
58
19
76
16
66
135
64
28
9
6
100
124
47
109
23
139
145
5
45
106
41`;
const testInput = `16
10
15
5
1
11
7
19
6
12
4`;
const test2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const lines = input
	.split('\n')
	.map((j) => parseInt(j))
	.sort((a, b) => (a < b ? -1 : 1));
console.log(lines.join(' '));
const diffs = {
	1: 0,
	2: 0,
	3: 0
};

let onediffs = 0;
const availPerms = [];

function addPerm() {
	if (onediffs === 2) {
		availPerms.push(2);
	} else if (onediffs === 3) {
		availPerms.push(4);
	} else if (onediffs === 4) {
		availPerms.push(7);
	}
}

function getNextLowest(jolt) {
	const nextAvailable = lines.filter((j) => j <= jolt + 3 && j > jolt);
	if (nextAvailable.length) {
		const next = Math.min(...nextAvailable);
		const diff = next - jolt;
		if (diff === 1) {
			onediffs++;
		} else {
			addPerm();
			onediffs = 0;
		}
		diffs[diff]++;
		getNextLowest(next);
	}
}

getNextLowest(0);
addPerm();
diffs[3]++;
console.log('part1', diffs[1] * diffs[3]);
console.log(
	'part2',
	availPerms,
	availPerms.reduce((a, b) => a * b)
);
