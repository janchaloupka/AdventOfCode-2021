import {readFileSync} from "fs";

const lines = readFileSync("input", "utf8")
    .split("\n")
    .map(v => v
        .split(" ")
        .map((v, i) => i > 0 ? parseInt(v, 10) : v)
    );

// Part 1
let depth = 0;
let hor = 0;
lines.forEach(v => {
    switch (v[0]) {
        case "down":
            depth += v[1];
            break;
        case "up":
            depth -= v[1];
            break;
        case "forward":
            hor += v[1];
            break;
        default:
            break;
    }
});

console.log(depth * hor);

// Part 2
depth = 0;
hor = 0;
let aim = 0;
lines.forEach(v => {
    switch (v[0]) {
        case "down":
            aim += v[1];
            break;
        case "up":
            aim -= v[1];
            break;
        case "forward":
            hor += v[1];
            depth += aim*v[1];
            break;
        default:
            break;
    }
});

console.log(depth * hor);
