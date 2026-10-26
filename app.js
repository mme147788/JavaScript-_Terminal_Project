// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.


import PromptSync from "prompt-sync";
const prompt = PromptSync();



import Player from "./classes/Player.js";
import riddles from "./riddles/index.js";
import MultipleChoiceRiddle from "./classes/MultipleChoiceRiddle.js";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

console.log("Welcome to Riddles")

let playerName = prompt("What is your name? ")
let player = new Player(playerName)

shuffle(riddles)

const level = prompt('Choose difficulty: easy / medium / hard: ');
let start
let end



for (let i = 0; i < riddles.length; i++) {
    let currentRiddle = riddles[i]
    if (currentRiddle.difficulty == level.trim().toLowerCase()) {
        start = Date.now()
       let newRiddle = new MultipleChoiceRiddle(currentRiddle)
       let result = newRiddle.ask(prompt)
        if(result>0){
            end+=result
        }
        end = Date.now()
        player.recordTime(start, end);
    }
}



console.log(player.showStats())


