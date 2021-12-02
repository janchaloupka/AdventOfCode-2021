import {readFileSync} from "fs";

const lines = readFileSync("input", "utf8").trim().split("\n")
    .map(v => v
        .split(" ")
        .map((v, i) => i > 0 ? parseInt(v, 10) : v)
    )

// Part 1
console.log(lines // map => (depth, hor) diff
    .map(v => v[0] == "down" ? [v[1], 0] : v[0] == "up" ? [-v[1], 0] : [0, v[1]])
    .reduce((p, v) => [p[0] + v[0], p[1] + v[1]], [0, 0])
    .reduce((p, v) => p * v)
);

// Part 2
console.log(lines // map => (aim, hor) diff
    .map(v => v[0] == "down" ? [v[1], 0] : v[0] == "up" ? [-v[1], 0] : [0, v[1]])
    .reduce((p, v, i, a) => v[1] == 0 ? p : [p[0] + v[1] * a.slice(0, i).reduce((p, v) => p + v[0], 0), p[1] + v[1]], [0, 0])
    .reduce((p, v) => p * v)
);
