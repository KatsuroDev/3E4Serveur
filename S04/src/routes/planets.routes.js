import express from "express";
import httpError from "http-errors";
import httpStatus from "http-status";

import PLANETS from "../data/planets.js";

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get("/", this.getAll); //Retrieve toutes les planètes
        router.get("/:idPlanet", this.getOne);
        router.post("/", this.postOne);
        router.delete("/:idPlanet", this.deleteOne);
        router.patch("/:idPlanet", this.patchOne);
        router.put("/:idPlanet", this.putOne);
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

    postOne(req, res, next) {
        const newPlanet = req.body;
        const planet = PLANETS.find(p => p.id == newPlanet.id);

        if(planet) {
            return next(httpError.Conflict(`A planet with id ${newPlanet.id} already exists.`));
        } else {
            PLANETS.push(newPlanet);

            res.status(httpStatus.CREATED);
            res.json(newPlanet);
        }
    }

    deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        
        const index = PLANETS.findIndex(p => p.id == idPlanet);

        if(index === -1) {
            return next(httpError.NotFound(`Planet with id ${idPlanet} doesn't exist.`));
        } else {
            PLANETS.splice(index, 1);
            res.status(httpStatus.NO_CONTENT).end();
        }
    }

    patchOne(req, res, next) {
        return next(httpError.NotImplemented());
    }

    putOne(req, res, next) {
        return next(httpError.NotImplemented());
    }
}

new PlanetsRoutes();
export default router;