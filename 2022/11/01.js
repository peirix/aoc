const fs = require('fs');
const data = fs.readFileSync('real.txt');
const input = data.toString().split('\n\n');

const removeShit = val => {
    return val.substring(val.indexOf(':') + 2);
};

let monkeys = [];
const setupMonkeys = () => {
    monkeys = [];
    input.forEach(i => {
        const lines = i.split('\n').map(i => i.trim());
        const items = removeShit(lines[1])
            .split(',')
            .map(x => parseInt(x));
        const operation = removeShit(lines[2]).substring(10);
        const test = parseInt(removeShit(lines[3]).substr(13));
        const throwTo = [
            parseInt(removeShit(lines[4]).substring(16)),
            parseInt(removeShit(lines[5]).substring(16))
        ];
        monkeys.push({
            items,
            operation,
            test,
            throwTo,
            inspects: 0
        });
    });
};

const runMonkeys = (nums, worry) => {
    for (let i = 0; i < nums; i++) {
        monkeys.forEach(m => {
            m.items.forEach(old => {
                m.inspects++;
                let newNum = eval(`old ${m.operation}`);
                if (nums === 20) {
                    newNum = Math.floor(newNum / worry);
                } else {
                    newNum %= worry;
                }
                if (newNum % m.test === 0) {
                    monkeys[m.throwTo[0]].items.push(newNum);
                } else {
                    monkeys[m.throwTo[1]].items.push(newNum);
                }
            });
            m.items = [];
        });
    }
};

setupMonkeys();
runMonkeys(20, 3);
let nums = monkeys.map(m => m.inspects).sort((a, b) => (a > b ? -1 : 1));
console.log('Part1: ', nums[0] * nums[1]);

setupMonkeys();
let divisible = 1;
monkeys.forEach(m => {
    divisible *= m.test;
});
runMonkeys(10000, divisible);
nums = monkeys.map(m => m.inspects).sort((a, b) => (a > b ? -1 : 1));
console.log('Part2: ', nums[0] * nums[1]);
