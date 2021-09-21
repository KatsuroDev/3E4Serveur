import express from 'express';

import errors from '../../S04/src/middlewares/errors.js';

const app = express();
app.use(express.json());

app.use(errors);

export default app;