import "./env.js";
import chalk from "chalk";
// const chalk = require("chalk");
import app from "./src/app.js";

const log = console.log;

log(chalk.green("Hello") + " " + chalk.bgBlue.inverse("World") + chalk.red("!"));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    log(chalk.red('Server listening on port ') + chalk.yellow(`${PORT}`));
});

