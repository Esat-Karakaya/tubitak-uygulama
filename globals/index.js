import {atom} from "jotai"

const nextGame=atom({get(){}})//selects the next game after "devam" is clicked
const gameMistakes=atom([])
const gameStatistics=atom(null)

//mazeGame atoms
const mazePlayerSpeed=atom(8)
const virtualMaze=atom(null)

export {
    nextGame,
    gameMistakes,
    gameStatistics,
    mazePlayerSpeed,
    virtualMaze
}