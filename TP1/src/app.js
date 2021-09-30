import express from 'express';
import database from './libs/database.js'

import errors from './middlewares/errors.js';

import observationsRoutes from './routes/observations.routes.js';

database();
const app = express();
app.use(express.json());

app.use('/observations', observationsRoutes);

app.use(errors);

export default app;