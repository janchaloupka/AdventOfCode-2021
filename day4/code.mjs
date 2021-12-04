import {readFileSync} from "fs";
const sections = readFileSync("input", "utf8").trim().split("\n\n");

const numbers = sections.shift().split(",").map(v => parseInt(v, 10));
// array of bingo cards (card is a 2D matrix)
let cards = sections.map(v => v.split("\n").map(v => v.trim().split(/\s+/).map(v => parseInt(v, 10))));

// check if all numbers in a row or col are marked
// (the matrix is transposed for column check)
const checkWin = card =>
    card.some(v => v.every(v => v == "*")) ||
    card[0].map((_, i) => card.map(v => v[i])).some(v => v.every(v => v == "*"));

const markNumber = (card, number) =>
    card.map(v => v.map(v => v == number ? "*" : v));

const firstWinBingo = (cards, numbers) =>
    numbers.map(n => {
        cards = cards.map(card => markNumber(card, n));
        const win = cards.find(v => checkWin(v));
        if(win) return [win, n];
    }).find(v => Array.isArray(v));

const lastWinBingo = (cards, numbers) =>
    numbers.map(n => {
        cards = cards.map(card => markNumber(card, n));
        if(cards.length === 1 && checkWin(cards[0])) return [cards[0], n];
        cards = cards.filter(v => !checkWin(v));
    }).find(v => Array.isArray(v));

const [firstWinCard, firstWinNumber] = firstWinBingo(cards, numbers);
console.log(firstWinCard.flat().filter(v => v != "*").reduce((sum, v) => sum + v, 0) * firstWinNumber);

const [lastWinCard, lastWinNumber] = lastWinBingo(cards, numbers);
console.log(lastWinCard.flat().filter(v => v != "*").reduce((sum, v) => sum + v, 0) * lastWinNumber);
