import express from "express";
import httpError from "http-errors";
import http from "http-status";

import PLANETS from "../data/planets.js";

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get("/planets", this.getAll); //Retrieve toutes les planètes
        router.get("/planets/:idPlanet", this.getOne);
        router.post("/planets", this.post);
    }

    getAll(req, res, next) {
        res.status(200);
        res.set("Content-Type", "application/json");

        res.send(PLANETS);
    }

    getOne(req, res, next) {

        const idPlanet = req.params.idPlanet;
        const planet = PLANETS.find(p => p.id == idPlanet);

        if(!planet)
            return next(httpError.NotFound(`Planet with id ${idPlanet} doesn't exist.`));
        else
        {
            res.status(200).json(planet);
        }
    }

    post(req, res, next) {

    }
}

new PlanetsRoutes();
export default router;