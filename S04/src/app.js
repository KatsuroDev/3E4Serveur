import express from "express";
import dayjs from "dayjs";

import methodMW from "./middlewares/method.js";
import errorMW from "./middlewares/errors.js";


import planetsRoutes from "./routes/planets.routes.js";
import elementsRoutes from "./routes/elements.routes.js";

import database from "./libs/database.js";

database();
const app = express();
app.use(express.json())

app.use(methodMW);
app.use('/planets', planetsRoutes);
app.use('/elements', elementsRoutes);

app.use(errorMW);
export default app;