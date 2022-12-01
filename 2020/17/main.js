const input = `.##.####
.#.....#
#.###.##
#####.##
#...##.#
#######.
##.#####
.##...#.`;
const testInput = `.#.
..#
###`;

const lines = testInput.split('\n');
// [z][x][y]
let cube = [];
const emptyLine = lines[0].split('').map(() => '.');
lines.forEach((line) => {
	cube[0] = [];
	cube[0][0] = emptyLine;
	cube[0][1] = line.split('');
	cube[0][2] = emptyLine;
});

let min = -1;
let max = emptyLine.length + 1;

function getOccAdj(w, z, x, y) {
	let occ = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			for (let k = -1; k < 2; k++) {
				for (let l = -1; l < 2; l++) {
					if (i || j || k || l) {
						occ +=
							cube[w + i] &&
							cube[w + i][z + j] &&
							cube[w + i][z + j][x + k] &&
							cube[w + i][z + j][x + k][y + l] &&
							cube[w + i][z + j][x + k][y + l] === '#'
								? 1
								: 0;
					}
				}
			}
		}
	}
	return occ;
}
let rounds = 0;

const round = () => {
	const newCube = [];
	let active = 0;
	for (let w = min; w < max; w++) {
		if (!newCube[w]) {
			newCube[w] = [];
		}
		for (let z = min; z < max; z++) {
			if (!newCube[w][z]) {
				newCube[w][z] = [];
			}
			for (let x = min; x < max; x++) {
				if (!newCube[w][z][x]) {
					newCube[w][z][x] = [];
				}
				for (let y = min; y < max; y++) {
					const close = getOccAdj(w, z, x, y);
					let newPos = '';
					if (
						cube[w] &&
						cube[w][z] &&
						cube[w][z][x] &&
						cube[w][z][x][y] === '#'
					) {
						if (close === 2 || close === 3) {
							newPos = '#';
							active++;
						} else {
							newPos = '.';
						}
					} else {
						if (close === 3) {
							newPos = '#';
							active++;
						} else {
							newPos = '.';
						}
					}
					// console.log(cube[z][x][y], newPos);
					newCube[w][z][x][y] = newPos;
				}
			}
		}
	}
	console.log(newCube);
	let output = '<pre>';
	for (let w = min; w < max; w++) {
		for (let z = min; z < max; z++) {
			output += `w=${w} z=${z}
`;
			for (let x = min; x < max; x++) {
				for (let y = min; y < max; y++) {
					output += newCube[w][z][x][y];
				}
				output += `
`;
			}
			output += `

`;
		}
	}
	document.write(output + '</pre>');
	cube = newCube;
	min--;
	max++;
	if (rounds < 5) {
		rounds++;
		// active = round();
	}
	return active;
};

console.log(round());

//3 -1 3
//5 -2 4
