// Riddle number 4.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default
    {
        id: 4,
        name: "Division",
        taskDescription: "What is 36 / 6?",
        correctAnswer: "6",
        choices: ["4", "5", "6", "7"],
        difficulty: "easy",
        timeLimit: 3000,
        hint: "How many times does 6 fit into 36?"
    }
