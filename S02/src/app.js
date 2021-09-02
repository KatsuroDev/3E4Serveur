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

//maths/somme
//maths/difference
//maths/produit
//maths/quotient
//maths/reste

app.get("/maths/:operation", (req, res) => {
    //console.log(req.query);

    const operation = req.params.operation;
    console.log(operation);

        
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    
    let result = 0;
    switch(operation) {
        case 'somme':
            result = a + b;
            break;
        case 'difference':
            result = a - b;
            break;
        case 'produit':
            result = a * b;
            break;
        case 'quotient':
            result = a / b;
            break;
        case 'reste':
            result = a % b;
            break;
        default:
            res.status(400);
            return res.send('Opération non reconnue');
    }

    res.status(200);
    res.set("Content-Type", "text/html");
    res.send(`<strong>${result}</strong>`);
});

export default app;