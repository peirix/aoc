const fs = require('fs');
const data = fs.readFileSync('test.txt');

// const input = data
//     .toString()
//     .split('\n')
//     .map(x => x.split(': '));

// const getNum = num => {
//     if (isNaN(num)) {
//         const parts = num.split(' ');
//         if (parts.length > 1) {
//             return eval(`${getNum(parts[0])} ${parts[1]} ${getNum(parts[2])}`);
//         } else {
//             const part = input.find(x => x[0] === num);
//             return getNum(part[1]);
//         }
//     }
//     return parseInt(num);
// };
// const root = input.find(x => x[0] === 'root');
// const first = getNum(root[1].split(' ')[0]);
// const sec = getNum(root[1].split(' ')[2]);

// console.log(root, first, sec);

const input = data.toString().split('\n');
console.log(input.length);
function new_count(word) {
    word = word.toLowerCase(); //word.downcase!
    if (word.length <= 3) {
        return 1;
    } //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, ''); //word.sub!(/^y/, '')
    const match = word.match(/[aeiouyæøåäáàëéèïíìöóòüúù]{1,2}/g);
    return match ? match.length : 1; //word.scan(/[aeiouy]{1,2}/).size
}
const tmp = [];
const syls = 4;
input.forEach(name => {
    if (name.length < 2) {
        return;
    }
    if (new_count(name) === syls) {
        tmp.push(name);
    }
});
fs.writeFile(`birds-${syls}.txt`, tmp.join('\n'), err => {
    if (err) {
        console.error(err);
    }
});
console.log(tmp.length);
