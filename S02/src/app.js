import express from "express";
import dayjs from "dayjs";

const app = express();

app.get('/premiere', (req, res) => {
    res.status(200)
    res.set("Content-Type", "text/plain");
    res.send("Notre première route avec express");
});

app.get("/date", (req, res) => {
    res.status(200);
    res.set("Content-Type", "text/plain");
    res.send(`${dayjs()}`)
});

app.get("/somme", (req, res) => {
    //console.log(req.query);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    res.status(200);
    res.set("Content-Type", "text/html");
    res.send(`<strong>${a + b}</strong>`);
});

export default app;