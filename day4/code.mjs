import {readFileSync} from "fs";
const sections = readFileSync("input", "utf8").trim().split("\n\n");

const numbers = sections.shift().split(",").map(v => parseInt(v, 10));
let cards = sections.map(v => v.split("\n").map(v => v.trim().split(/\s+/).map(v => parseInt(v, 10))));

const checkWin = card =>
    card.some(v => v.every(v => v == "*")) ||
    card[0].map((_, i) => card.map(v => v[i])).some(v => v.every(v => v == "*"));

const applyNumber = (card, number) =>
    card.map(v => v.map(v => v == number ? "*" : v));

const winBingo = (cards, numbers) => {
    for (const n of numbers) {
        cards = cards.map(card => applyNumber(card, n));
        for (const card of cards) {
            if(checkWin(card)){
                return [card, n];
            }
        }
    }
}

const lastWinBingo = (cards, numbers) => {
    for (const n of numbers) {
        cards = cards.map(card => applyNumber(card, n));
        for (let i=0; i < cards.length; i++) {
            if(checkWin(cards[i])){
                if(cards.length === 1){
                    return [cards[i], n];
                }else{
                    cards.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

const [winCard, winNumber] = winBingo(cards, numbers);
console.log(winCard.flat().reduce((p, v) => v == "*" ? p : p + v, 0) * winNumber);

const [lastWinCard, lastWinNumber] = lastWinBingo(cards, numbers);
console.log(lastWinCard.flat().reduce((p, v) => v == "*" ? p : p + v, 0) * lastWinNumber);
