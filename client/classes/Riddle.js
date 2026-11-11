// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct


export default class Riddle {
    constructor(details) {
        this.id = details.id
        this.name = details.name
        this.taskDescription = details.taskDescription
        this.correctAnswer = details.correctAnswer
        this.timeLimit = details.timeLimit
        this.hint = details.hint
    }

    ask(prompt) {
        console.log(`${this.name}:  ${this.taskDescription} `)
        let answer = prompt("What is the answer? ");

        while (answer!==this.correctAnswer) {
           answer = prompt("Wrong! Try again ");
        }
    }
    
}