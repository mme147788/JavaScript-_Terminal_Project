import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const db = await readDb()
        res.json(db.riddles)
    }
    catch (error) {
        res.status(500).json({ message: 'Error reading riddles' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const db = await readDb()
        const riddle = db.riddles.find(riddle => riddle.id === Number(req.params.id))

        if (!riddle) {
            return res.status(404).json({
                message: 'Riddle not found'
            });
        }

        res.json(riddle)
    }

    catch (error) {
        res.status(500).json({ message: 'Error reading riddle' })

    }
})

router.post('/', async (req, res) => {
    try {
        const db = await readDb()

        const newRiddle = {
            id: db.riddles.length > 0
                ? Math.max(...db.riddles.map(riddle => riddle.id)) + 1
                : 1,
            name: req.body.name,
            taskDescription: req.body.taskDescription,
            correctAnswer: req.body.correctAnswer,
            choices: req.body.choices,
            difficulty: req.body.difficulty,
            timeLimit: req.body.timeLimit,
            hint: req.body.hint
        };

        db.riddles.push(newRiddle)

        await writeDb(db)


        res.status(201).json(newRiddle)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error creating riddle'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const db = await readDb()

        const riddle = db.riddles.find(riddle => riddle.id === Number(req.params.id))

        if (!riddle) {
            return res.status(404).json({
                message: 'Riddle not found'
            })
        }

        riddle.name = req.body.name;
        riddle.taskDescription = req.body.taskDescription;
        riddle.correctAnswer = req.body.correctAnswer;
        riddle.choices = req.body.choices;
        riddle.difficulty = req.body.difficulty;
        riddle.timeLimit = req.body.timeLimit;
        riddle.hint = req.body.hint;

        await writeDb(db)

        res.json(riddle)
    }

    catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error updating riddle'
        });
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();

        const riddleIndex = db.riddles.findIndex(
            riddle => riddle.id === Number(req.params.id)
        )

        if (riddleIndex === -1) {
            return res.status(404).json({
                message: 'Riddle not found'
            })
        }

        const deletedRiddle = db.riddles.splice(riddleIndex, 1);

        await writeDb(db);

        res.json({
            message: 'Riddle deleted successfully',
            riddle: deletedRiddle[0]
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Error deleting riddle'
        })
    }
});

export default router