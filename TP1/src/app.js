import express from 'express';

import errors from '../../S04/src/middlewares/errors.js';

import observationsRoutes from './routes/observations.routes.js';


const app = express();
app.use(express.json());

app.use('/observations', observationsRoutes);

app.use(errors);

export default app;