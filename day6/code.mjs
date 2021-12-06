import {readFileSync} from "fs";
const inputFish = readFileSync("input", "utf8").trim().split(",").map(v => BigInt(v));
const fish = [...Array(9)].map((_, i) => inputFish.map(v => BigInt(v)).filter(v => v == i).length);

const advanceDay = fish =>
    [...fish.slice(1), fish[0]].map((v, i) => i == 6 ? v + fish[0] : v);

const advanceDays = (fish, days) =>
    [...Array(days)].reduce(fish => advanceDay(fish), fish);

console.log(advanceDays(fish, 80).reduce((p, v) => p + v));
console.log(advanceDays(fish, 256).reduce((p, v) => p + v));
