import {readFileSync} from "fs";
const lines = readFileSync("input", "utf8").trim().split("\n").map(v => v.split(""));

// Part 1
console.log(lines[0]
    .map((_, i) => lines.map(v => v[i])) // transpose matrix
    .map(v => v.reduce((p, v) => p += v == "1", 0)) // count ones in each row
    .map(v => v >= (lines.length - v)) // get most common bit (t=1, f=0)
    .map(v => [v ? "1" : "0", !v ? "1" : "0"])
    .reduce((p, v) => [p[0] + v[0], p[1] + v[1]], ["", ""])
    .map(v => parseInt(v, 2))
    .reduce((p, v) => p * v, 1)
);

//Part 2

function getOxygen(lines, i=0){
    if(lines.length <= 1) return parseInt(lines[0].join(""), 2);

    const count = lines.reduce((p, v) => v[i] == "1" ? p+1 : p, 0);
    const common = count >= (lines.length - count) ? "1" : "0";

    lines = lines.filter(v => v[i] == common);
    return getOxygen(lines, (i + 1) % lines[0].length);
}

function getCO2(lines, i=0){
    if(lines.length <= 1) return parseInt(lines[0].join(""), 2);

    const count = lines.reduce((p, v) => v[i] == "1" ? p+1 : p, 0);
    const common = count >= (lines.length - count) ? "1" : "0";

    lines = lines.filter(v => v[i] != common);
    return getCO2(lines, (i + 1) % lines[0].length);
}

console.log(getOxygen(lines) * getCO2(lines));
