// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle

export default class Player {
    constructor(name) {
        this.name = name
        this.times = []
    }

    recordTime(start, end) {
         return this.times.push((end - start) / 1000);
    }

    showStats() {
        let totalTime = 0
        for (let i = 0; i < this.times.length; i++) {
            totalTime += this.times[i]
        }

        const averageTime = this.times.length > 0
            ? totalTime / this.times.length
            : 0;

        return `Total time: ${totalTime}\nAverage time: ${averageTime}`
    }
}
