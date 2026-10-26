import Riddle from "./Riddle.js";


export default class MultipleChoiceRiddle extends Riddle {
    constructor(details) {
        super(details)
        this.choices = details.choices
    }

    ask(prompt) {
        let penalty = 0
        let hint = prompt("type 'hint' to recieve a clue. 10 seconds penalty will be added")
        if (hint.toLowerCase()==='hint'){
            console.log(this.hint)
            penalty = 10000
        }
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
            console.log(`${i + 1} ${this.choices[i]}`)
        }

        answer = Number(prompt("What is the answer?\n"));


        while (answer !== correct) {
            answer = Number(prompt("Wrong! Try again\n"));
        }

        if (Date.now() - start > this.timeLimit ) {
            console.log("Too slow! 5 seconds penalty applied.")
            penalty+=5000
        }

        return penalty
    }
}