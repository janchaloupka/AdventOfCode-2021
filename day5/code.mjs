import {readFileSync} from "fs";
const lines = readFileSync("input", "utf8").trim().split("\n").map(v => v.split("->").map(v => v.split(",").map(v => parseInt(v.trim(), 10))));

let allowDiagonal = false;

const fillPixel = (x, y, p1, p2) => {
    if(p1[0] > p2[0]) [p1, p2] = [p2, p1];

    // horizontal
    if(p1[0] == p2[0]){
        if(p1[1] > p2[1]) [p1, p2] = [p2, p1];
        return y >= p1[1] && y <= p2[1] && x == p1[0];
    }

    // vertical
    if(p1[1] == p2[1]){
        return x >= p1[0] && x <= p2[0] && y == p1[1];
    }

    // diagonal
    if(allowDiagonal && Math.abs(p1[0] - p2[0]) == Math.abs(p1[1] - p2[1])){
        if(p2[1] > p1[1])
            return x >= p1[0] && x <= p2[0] && y == p1[1] + (x - p1[0]);
        else
            return x >= p1[0] && x <= p2[0] && y == p1[1] - (x - p1[0]);
    }

    return false;
}

const resizeCanvas = (canvas, width, height) => {
    if(width > canvas.length)
        canvas = [...canvas, ...Array(width - canvas.length).fill([])];

    return canvas.map(v => v.length > height ? v : [...v, ...Array(height - v.length).fill(0)])
}

const drawLine = (canvas, line) => {
    const width = line.map(v => v[0]).sort((a, b) => b - a)[0] + 1;
    const height = line.map(v => v[1]).sort((a, b) => b - a)[0] + 1;

    return resizeCanvas(canvas, width, height).map((v, x) => v.map((v, y) => v + fillPixel(x, y, line[0], line[1])));
}

// Part 1
console.log(lines.reduce((canvas, line) => drawLine(canvas, line), []).flat().filter(v => v > 1).length);

// Part 2
allowDiagonal = true;
console.log(lines.reduce((canvas, line) => drawLine(canvas, line), []).flat().filter(v => v > 1).length);
