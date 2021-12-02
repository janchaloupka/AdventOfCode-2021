import {readFileSync} from "fs";

console.log(readFileSync("input", "utf8").trim().split("\n")
    .map(v => v.split(" ").map((v, i) => i > 0 ? parseInt(v, 10) : v))
    .map(v => v[0] == "down" ? [v[1], 0] : v[0] == "up" ? [-v[1], 0] : [0, v[1]])
    .reduce((p, v, i, a) => v[1] == 0 ? [p[0] + v[0], p[1], p[2], p[3]] : [p[0], p[1] + v[1], p[2] + v[1] * a.slice(0, i).reduce((p, v) => p + v[0], 0), p[3] + v[1]], [0, 0, 0, 0])
    .reduce((p, v, i) => i < 2 ? [p[0] * v, p[1]] : [p[0], p[1] * v], [1, 1])
);
