import {readFileSync} from "fs";
const input = readFileSync("input", "utf8").trim().split("\n").map(v => v.split("|").map(v => v.trim().split(" ").map(v => [...v].sort().join(""))));

console.log(input.map(v => v[1]).flat().filter(v => v.length == 7 || (v.length >= 2 && v.length <= 4)).length)

const containChars = (str, chars) =>
    [...chars].every(v => str.includes(v));

const findAndSplice = (arr, callback) => {
    const val = arr.find(callback);
    arr.splice(arr.indexOf(val), 1);
    return val;
}

const getLayout = (output) => {
    const group = output.reduce((p, v) => p[v.length] ? {...p, [v.length]: [...p[v.length], v]} : {...p, [v.length]: [v]}, {});
    const digits = Array(10);
    digits[1] = group[2][0];
    digits[4] = group[4][0];
    digits[7] = group[3][0];
    digits[8] = group[7][0];
    digits[3] = findAndSplice(group[5], v => containChars(v, digits[7]));
    digits[5] = findAndSplice(group[5], v => [...v].reduce((p, v) => p + digits[4].includes(v), 0) == 3);
    digits[2] = group[5][0];
    digits[9] = findAndSplice(group[6], v => containChars(v, digits[4]));
    digits[0] = findAndSplice(group[6], v => containChars(v, digits[7]));
    digits[6] = group[6][0];

    return digits;
}

const getNumber = (input, layout) =>
    input.reduce((p, v, i, a) => p + layout.indexOf(v) * Math.pow(10, a.length - 1 - i), 0);

console.log(
    input.reduce((p, v) => p + getNumber(v[1], getLayout(v[0])), 0)
);
