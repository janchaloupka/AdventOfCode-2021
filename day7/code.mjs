import {readFileSync} from "fs";
const crabs = readFileSync("input", "utf8").trim().split(",").map(v => parseInt(v, 10));

const distance = (crabs, point) =>
    crabs.reduce((p, v) => Math.abs(v - point) + p, 0);

const cumulativeDistance = (crabs, point) =>
    crabs.reduce((p, v) => [...Array(Math.abs(v - point))].map((_,i) => i + 1).reduce((p, v) => p + v, 0) + p, 0);

console.log(
    crabs.reduce((p, v, _, a) => {
        const alignAll = distance(a, v);
        return alignAll < p ? alignAll : p;
    }, Number.MAX_SAFE_INTEGER)
);

console.log((() => {
    const [roughAlign, roughMin] = crabs.reduce((p, v, _, a) => {
        const alignAll = cumulativeDistance(a, v);
        return alignAll < p[1] ? [v, alignAll] : p;
    }, [0, Number.MAX_SAFE_INTEGER]);

    let minDec = roughMin;
    for(let align = roughAlign; cumulativeDistance(crabs, align) <= minDec; align--)
        minDec = cumulativeDistance(crabs, align) ;

    let minInc = roughMin;
    for(let align = roughAlign; cumulativeDistance(crabs, align) <= minInc; align++)
        minInc = cumulativeDistance(crabs, align);

    return minDec < minInc ? minDec : minInc;
})());
