import {atom} from "jotai"

const nextGame=atom({get(){}})//selects the next game after "devam" is clicked
const gameMistakes=atom([])
const gameStatistics=atom(null)

//mazeGame atoms
const mazePlayerSpeed=atom(8)
const virtualMaze=atom(null)

//Storage Keys
const EMOJIS_LS="emojisGameMistakes"
const MAZE_LS="mazeGameMistakes"
const STATISTICS_LS="falseAndTotal"

export {
    nextGame,
    gameMistakes,
    gameStatistics,
    mazePlayerSpeed,
    virtualMaze,
    EMOJIS_LS,
    MAZE_LS,
    STATISTICS_LS
}