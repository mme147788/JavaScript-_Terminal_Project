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

import PromptSync from "prompt-sync"
const prompt = PromptSync()

import Player from "./classes/Player.js"
import MultipleChoiceRiddle from "./classes/MultipleChoiceRiddle.js"
import * as riddles from "./api/riddlesApi.js"
import * as players from "./api/playersApi.js"

let choice


// -------------------------------------- Main loop ---------------------------------------------
do {
    showManue()

    choice = prompt("Choose one of the options: ")

    switch (choice) {
        case "1":
            await playGame()
            break;

        case "2":
            await createNewRiddle()
            break;

        case "3":
            await getRiddles()
            break;

        case "4":
            await editRiddle()
            break;

        case "5":
            await removeRiddle()
            break;

        case "6":
            await showLeaderboard()
            break;

        case "0":
            console.log("Goodbye!")
            break;
    }

} while (choice !== "0")


// Manue
function showManue() {
    const manue = ["What do you want to do?",
        "1. Play the game",
        "2. Create a new riddle",
        "3. Read all riddles",
        "4. Update an existing riddle",
        "5. Delete a riddle",
        "6. View leaderboard",
        "0. Exit"]
    for (let i = 0; i < manue.length; i++) {
        console.log(manue[i])
    }
}

// -------------------------------------------------------------------------------------------------------

// -------------------------------------- ALL FUNCTIONS --------------------------------------------------

// -------------------------------------- Creating a new riddle -------------------------------------------


async function createNewRiddle() {
    const riddle = newRiddle()

    const result = await riddles.createRiddle(riddle)

    console.log("Riddle created:", result)
}

function newRiddle() {
    let name = prompt("Enter riddle name: ")
    let taskDescription = prompt("Enter description: ")
    let correctAnswer = prompt("Enter correct answer: ")

    let choices = prompt("Enter choices separated by commas: ")
        .split(",")
        .map(choice => choice.trim())

    let difficulty = prompt("Enter difficulty (easy / medium / hard): ")
        .trim()
        .toLowerCase()

    let timeLimit = Number(prompt("Enter time limit in milliseconds: "))
    let hint = prompt("Enter a hint: ")

    return {
        name,
        taskDescription,
        correctAnswer,
        choices,
        difficulty,
        timeLimit,
        hint
    }
}

// -------------------------------------------------------------------------------------------------------


// -------------------------------------- Edit riddle ----------------------------------------------------
async function editRiddle() {
    const riddleId = prompt("Enter riddle ID: ")
    const updatedRiddle = newRiddle()

    const result = await riddles.updateRiddle(riddleId, updatedRiddle)

    console.log("Updated riddle:", result)
}

// -------------------------------------------------------------------------------------------------------


// -------------------------------------- Remove riddle ---------------------------------------------------
async function removeRiddle() {
    const riddleId = prompt("Enter the ID of the riddle you want to delete: ")

    const result = await riddles.deleteRiddle(riddleId)

    console.log("Deleted riddle:", result)
}
// -------------------------------------------------------------------------------------------------------


// -------------------------------------- Read all riddles -----------------------------------------------

//Return all riddles without showing
async function fetchRiddles() {
    const allRiddles = await riddles.getAllRiddles()

  if (!Array.isArray(allRiddles)) {
        console.log("Could not load riddles.")
        return []
    }

    return allRiddles
}

//Show all riddles
async function getRiddles() {
    const allRiddles = await fetchRiddles()

    console.log("\nAll riddles:")

    allRiddles.forEach(riddle => {
        console.log("--------------------")
        console.log(`ID: ${riddle.id}`)
        console.log(`Name: ${riddle.name}`)
        console.log(`Description: ${riddle.taskDescription}`)
        console.log(`Correct answer: ${riddle.correctAnswer}`)
        console.log(`Difficulty: ${riddle.difficulty}`)
    })
}
// -------------------------------------------------------------------------------------------------------


// -------------------------------------- Show leaderboard -----------------------------------------------

async function showLeaderboard() {
    const allPlayers = await players.getAllPlayers()

    const leaderboard = allPlayers
        .filter(player => player.lowestTime !== null)
        .sort((a, b) => a.lowestTime - b.lowestTime)

    if (leaderboard.length === 0) {
        console.log("No records yet.")
        return
    }

    console.log("\nLeaderboard:")

    leaderboard.forEach((player, index) => {
        console.log(
            `${index + 1}. ${player.name} - ${player.lowestTime} seconds`
        )
    })
}
// -------------------------------------------------------------------------------------------------------


// -------------------------------------- Play the game --------------------------------------------------
async function playGame() {

    let playerName = prompt("What is your name? ")

    let playerExist = await players.findPlayerByName(playerName)

    let p

    let pLowestTime

    if (playerExist !== undefined) {
        p = playerExist
        pLowestTime = playerExist.lowestTime

        if (pLowestTime === null) {
            console.log(`Hi ${playerName}! This is your first game!`)
        }
        else {
            console.log(`Hi ${playerName}! Your previous lowest time was ${pLowestTime} seconds.`)
        }
    }
    else {
        p = await players.createPlayer(playerName)
        console.log(`Welcome ${playerName}! This is your first game!`)
    }

    pLowestTime = p.lowestTime

    let player = new Player(playerName, playerExist?.lowestTime ?? null)

    const riddles = await fetchRiddles()

    shuffle(riddles)

    const level = prompt('Choose difficulty: easy / medium / hard: ')

    for (let i = 0; i < riddles.length; i++) {
        let currentRiddle = riddles[i]

        if (currentRiddle.difficulty == level.trim().toLowerCase()) {

            let start = Date.now()

            let newRiddle = new MultipleChoiceRiddle(currentRiddle)
            let result = newRiddle.ask(prompt)

            let end = Date.now()

            player.recordTime(start, end + result)

        }
    }

    console.log(player.showStats())

    let totalTime = 0

    for (let i = 0; i < player.times.length; i++) {
        totalTime += player.times[i]
    }

    if (pLowestTime === null || totalTime < pLowestTime) {
        p.lowestTime = totalTime

        const updatedPlayer = await players.updatePlayer(p)

        if (typeof updatedPlayer !== "object") {
            console.log("Could not save your new record.")
            return
        }

        console.log(`Great job, ${playerName}! Your new record is ${totalTime} seconds!`)

    }
    else {
        console.log(`Your best time is still ${pLowestTime} seconds.`)
    }
}

//Shuffle riddles
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))

        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array
}
// -------------------------------------------------------------------------------------------------------