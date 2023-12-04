import {atom} from "jotai"

const nextGame=atom({get(){}})//selects the next game after "devam" is clicked
const gameMistakes=atom([])
const gameStatistics=atom(null)

export {
    nextGame,
    gameMistakes,
    gameStatistics,
}