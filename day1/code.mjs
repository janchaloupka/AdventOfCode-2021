import {readFileSync} from "fs";

const lines = readFileSync("input", "utf8")
    .split("\n")
    .map(v => parseInt(v, 10));

// Part 1
console.log(lines
    .map((v, i, a) => i > 0 ? v > a[i-1] : 0)
    .reduce((p, v) => p + v)
);

// Part 2
console.log(lines
    .map((_, i, a) => i < 2 ? undefined : a
        .slice(i-2, i+1)
        .reduce((p, v) => p + v))
    .map((v, i, a) => i > 0 ? v > a[i-1] : 0)
    .reduce((p, v) => p + v)
);
