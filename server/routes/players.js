import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = await readDb();

        const name = req.query.name;

        if (name) {
            const player = db.players.find(
                player => player.name.toLowerCase() === name.toLowerCase()
            );

            if (!player) {
                return res.status(404).json({
                    message: 'Player not found'
                });
            }

            return res.json(player);
        }

        res.json(db.players);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error reading players'
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const db = await readDb();

        const newPlayer = {
            id: db.players.length > 0
                ? Math.max(...db.players.map(player => player.id)) + 1
                : 1,
            name: req.body.name,
            lowestTime: null
        };

        db.players.push(newPlayer);

        await writeDb(db);

        res.status(201).json(newPlayer);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error creating player'
        });
    }
});

router.put('/:id', async (req, res) => {
    console.log("PUT request received:", req.params.id, req.body);
    try {
        const db = await readDb();

        const player = db.players.find(
            player => player.id === Number(req.params.id)
        );

        if (!player) {
            return res.status(404).json({
                message: 'Player not found'
            });
        }

        player.lowestTime = req.body.lowestTime;

        await writeDb(db);

        res.json(player);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error updating player'
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();

        const playerIndex = db.players.findIndex(
            player => player.id === Number(req.params.id)
        );

        if (playerIndex === -1) {
            return res.status(404).json({
                message: 'Player not found'
            });
        }

        const deletedPlayer = db.players.splice(playerIndex, 1);

        await writeDb(db);

        res.json({
            message: 'Player deleted successfully',
            player: deletedPlayer[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error deleting player'
        });
    }
});


export default router;