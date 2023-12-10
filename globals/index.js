import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from "jotai"

const nextGame=atom({get(){}})// selects the next game after "devam" is clicked
const gameMistakes=atom([])
const gameStatistics=atom(null)

// mazeGame atoms
const mazePlayerSpeed=atom(8)
const virtualMaze=atom(null)

// Storage Keys
const EMOJIS_LS="emojisGameMistakes"
const MAZE_LS="mazeGameMistakes"
const PASSWORD_LS="passwordGameMistakes"
const STATISTICS_LS="falseAndTotal"

// Helpers
function updateStorage({ isSuccessful, mistakes, statistics, gameKey, gameName, gameToAdd }) {
    if (mistakes.length > 4) { // If the question was asked before
        mistakes.shift()
    }
    if (!isSuccessful) { // If the game was lost add to mistakes
        mistakes.push(gameToAdd)
        statistics[gameName][0]++ // Incrementing the incorrection number in DB
    }
    statistics[gameName][1]++ // Incrementing the playing number in DB

    const storageSets=[
        [gameKey, JSON.stringify(mistakes)],
        [STATISTICS_LS, JSON.stringify(statistics)]
    ]

    AsyncStorage.multiSet(storageSets)
}

export {
    nextGame,
    gameMistakes,
    gameStatistics,
    mazePlayerSpeed,
    virtualMaze,
    EMOJIS_LS,
    MAZE_LS,
    PASSWORD_LS,
    STATISTICS_LS,
    updateStorage,
}