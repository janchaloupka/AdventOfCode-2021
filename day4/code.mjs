import {readFileSync} from "fs";
const sections = readFileSync("input", "utf8").trim().split("\n\n");

const numbers = sections.shift().split(",").map(v => parseInt(v, 10));
let cards = sections.map(v => v.split("\n").map(v => v.trim().split(/\s+/).map(v => parseInt(v, 10))));

const checkWin = card =>
    card.some(v => v.every(v => v == "*")) ||
    card[0].map((_, i) => card.map(v => v[i])).some(v => v.every(v => v == "*"));

const applyNumber = (card, number) =>
    card.map(v => v.map(v => v == number ? "*" : v));

const firstWinBingo = (cards, numbers) =>
    numbers.map(n => {
        cards = cards.map(card => applyNumber(card, n));
        const win = cards.find(v => checkWin(v));
        if(win) return [win, n];
    }).find(v => Array.isArray(v));

const lastWinBingo = (cards, numbers) =>
    numbers.map(n => {
        cards = cards.map(card => applyNumber(card, n));
        if(cards.length === 1 && checkWin(cards[0])) return [cards[0], n];
        cards = cards.filter(v => !checkWin(v));
    }).find(v => Array.isArray(v));

const [firstWinCard, firstWinNumber] = firstWinBingo(cards, numbers);
console.log(firstWinCard.flat().reduce((p, v) => v == "*" ? p : p + v, 0) * firstWinNumber);

const [lastWinCard, lastWinNumber] = lastWinBingo(cards, numbers);
console.log(lastWinCard.flat().reduce((p, v) => v == "*" ? p : p + v, 0) * lastWinNumber);
