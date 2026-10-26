// Riddle number 1.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default
    {
        id: 1,
        name: "Easy Math",
        taskDescription: "What is 7 + 6?",
        correctAnswer: "13",
        choices: ["11", "12", "13", "14"],
        difficulty: "easy",
        timeLimit: 3000,
        hint: "Start with 7 and count 6 more."
    }
