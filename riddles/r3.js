// Riddle number 3.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default
    {
        id: 3,
        name: "Multiplication",
        taskDescription: "What is 4 * 5?",
        correctAnswer: "20",
        choices: ["25", "18", "32", "20"],
        difficulty: "hard",
        timeLimit: 8000,
        hint: "Add 5 four times."
    }
