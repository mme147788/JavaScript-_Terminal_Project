// Riddle number 2.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default
    {
        id: 2,
        name: "Subtraction",
        taskDescription: "What is 15 - 8?",
        correctAnswer: "7",
        choices: ["6", "7", "8", "9"],
        difficulty: "medium",
        timeLimit: 5000,
        hint: "Start at 15 and count 8 steps backward."
    }