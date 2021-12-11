import {readFileSync} from "fs";
const input = readFileSync("input", "utf8").trim().split("\n").map(v => v.split(""));

const checkSyntax = line => {
    const stack = [];
    for (const c of line) {
        if(["(", "[", "{", "<"].includes(c))
            stack.push(c);
        else if({"(": ")", "[": "]", "{": "}", "<": ">"}[stack.pop()] != c)
            return {")": 3, "]": 57, "}": 1197, ">": 25137}[c];
    }

    return 0;
}

console.log(input.reduce((p, v) => p + checkSyntax(v), 0));

console.log(input
    .filter(v => checkSyntax(v) == 0)
    .map(v =>
        v.reduce((q, v) => ["(", "[", "{", "<"].includes(v) ? [v, ...q] : q.slice(1), [])
        .map(v => ({"(": 1, "[": 2, "{": 3, "<": 4})[v])
        .reduce((p, v) => p * 5 + v, 0))
    .sort((a, b) => a - b)
    .reduce((p, v, i, a) => ((a.length - 1) / 2 == i) ? v : p, 0)
);
