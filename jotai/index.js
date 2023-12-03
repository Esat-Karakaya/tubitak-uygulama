import {atom} from "jotai"

const nextGame=atom({get(){}})//selects the next game after "devam" is clicked
const gameMistakes=atom([])

export {
    nextGame,
    gameMistakes
}