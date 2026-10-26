// Riddle number 5.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default
    {
        id: 5,
        name: "Number Pattern",
        taskDescription: "What comes next: 2, 4, 6, 8, ...?",
        correctAnswer: "10",
        choices: ["9", "10", "11", "12"],
        difficulty: "hard",
        timeLimit: 8000,
        hint: "Look at the difference between consecutive numbers."
    }