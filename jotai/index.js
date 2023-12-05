import {atom} from "jotai"

const nextGame=atom({get(){}})//selects the next game after "devam" is clicked
const gameMistakes=atom([])
const gameStatistics=atom(null)
const mazePlayerSpeed=atom(8)

export {
    nextGame,
    gameMistakes,
    gameStatistics,
    mazePlayerSpeed
}