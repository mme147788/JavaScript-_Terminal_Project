import Riddle from "./Riddle.js";


export default class MultipleChoiceRiddle extends Riddle {
    constructor(details) {
        super(details)
        this.choices = details.choices
    }

    ask(prompt) {
        let penalty = 0
        let start = Date.now()
        let answer
        let correct

        for (let i = 0; i < this.choices.length; i++) {
            if (this.choices[i] === this.correctAnswer) {
                correct = i + 1;
            }
        }

        console.log(`${this.name}:  ${this.taskDescription}\n`)


        for (let i = 0; i < this.choices.length; i++) {
            console.log(`${i + 1} ${this.choices[i]}\n`)
        }

        console.log("What is the answer?\n")

        answer = prompt("Type your answer, or type 'hint' to recieve a clue. 10 seconds penalty will be added ")

        if (answer.toLowerCase() === 'hint') {
            console.log(this.hint);
            penalty = 10000;
            answer = prompt("What is the answer?");
        }

        while (Number(answer) !== correct) {
            answer = prompt("Wrong! Try again");
        }

        if (Date.now() - start > this.timeLimit && answer.toLowerCase() !== 'hint') {
            console.log("Too slow! 5 seconds penalty applied.")
            penalty += 5000
        }

        return penalty
    }
}