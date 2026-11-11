
import express from 'express';

const app = express();

app.use(express.json())

import riddlesRoutes from './routes/riddles.js';
import playersRoutes from './routes/players.js';

app.use('/api/riddles', riddlesRoutes);
app.use('/api/players', playersRoutes);


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})

app.on('error', (error) => {
    console.error('SERVER ERROR:', error);
});