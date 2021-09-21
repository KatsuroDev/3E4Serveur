import express from "express";
import httpError from "http-errors";
import httpStatus from "http-status";

import PLANETS from "../data/planets.js";
import planetsRepository from "../repositories/planets.repository.js";

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

    async getAll(req, res, next) {

        const filter = {};

        if(req.query.explorer){
            filter.discoveredBy = req.query.explorer;
        }

        try {
            const planets = await planetsRepository.retrieveAll(filter);
            res.status(200).json(planets);

        } catch(err) {
           return next(err); 
        }
    }

    async getOne(req, res, next) {

        const idPlanet = req.params.idPlanet;

        try {
                const planet = await planetsRepository.retrieveById(idPlanet);
        
                if(!planet)
                    return next(httpError.NotFound(`Planet with id ${idPlanet} doesn't exist.`));
                else
                {
                    res.status(200).json(planet);
                }
        }
        catch(err) {
            return next(err);
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