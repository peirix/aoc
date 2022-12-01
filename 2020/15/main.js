const input = `16,1,0,18,12,14`;
const testInput = `0,3,6`;

const nums = testInput.split(',').map((n) => parseInt(n));
console.time('round');
const indexes = {};
let last = nums.splice(nums.length - 1);
nums.forEach((v, i) => (indexes[v] = i));
for (i = nums.length; i < 2019; i++) {
	let nlast = indexes[last] === undefined ? 0 : i - indexes[last];
	indexes[last] = i;
	last = nlast;
}
console.timeEnd('round');
console.log(last);

//59006 low
//78731 low
//29230199 high
//16671510
