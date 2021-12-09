import {readFileSync} from "fs";
const input = readFileSync("input", "utf8").trim().split("\n").map(v => v.split("").map(v => parseInt(v, 10)));

const lowPointsMap = (table, callback) =>
    table.map((row, y, rows) => row.map((cell, x, cols) =>
        (x == cols.length - 1 || cols[x + 1] > cell) &&
        (x == 0 || cols[x - 1] > cell) &&
        (y == rows.length - 1 || rows[y + 1][x] > cell) &&
        (y == 0 || rows[y - 1][x] > cell) ? callback(cell, x, y) : undefined
    )).flat().filter(v => v !== undefined);

const getBasinSize = (table, v, x, y) => {
    if(x < 0 || y < 0 || y >= table.length || x >= table[0].length || table[y][x] == 9 || table[y][x] <= v) return 0;
    v = table[y][x];
    table[y][x] = 9;
    return getBasinSize(table, v, x - 1, y) +
        getBasinSize(table, v, x + 1, y) +
        getBasinSize(table, v, x, y - 1) +
        getBasinSize(table, v, x, y + 1) + 1;
}

console.log(lowPointsMap(input, (v) => v).map(v => v + 1).reduce((p, v) => p + v, 0));

console.log(lowPointsMap(input, (_, x, y) => getBasinSize(input, -1, x, y)).sort((a, b) => b - a).filter((_, i) => i < 3).reduce((p, v) => p * v, 1));
