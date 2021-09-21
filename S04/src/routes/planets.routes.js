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

        // FILTERS
        const filter = {};
        if(req.query.explorer){
            filter.discoveredBy = req.query.explorer;
        }

        // TRANSFORMS
        const transformOptions = {};
        if(req.query.unit){
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(httpError.BadRequest(`Unit parameter '${unit}' is invalid.`));
            }
        }

        try {
            let planets = await planetsRepository.retrieveAll(filter);

            planets = planets.map(p => {
                p = p.toObject({getters:true, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
            });
            res.status(200).json(planets);

        } catch(err) {
           return next(err); 
        }
    }

    async getOne(req, res, next) {

        const idPlanet = req.params.idPlanet;

        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(httpError.BadRequest(`Unit parameter '${unit}' is invalid.`));
            }
        }

        try {
                let planet = await planetsRepository.retrieveById(idPlanet);
        
                
                if(!planet)
                    return next(httpError.NotFound(`Planet with id ${idPlanet} doesn't exist.`));
                else
                {
                    planet = planet.toObject({getters:true, virtuals:false});
                    planet = planetsRepository.transform(planet, transformOptions);

                    res.status(200).json(planet);
                }
        }
        catch(err) {
            return next(err);
        }
    }

    async postOne(req, res, next) {
        const newPlanet = req.body;
        //TODO: Validation rapide jusqu'à la semaine +/- 8
        try {
            let planetAdded = await planetsRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({getters:true, virtuals:false});
            planetAdded = planetsRepository.transform(planetAdded);

            res.status(201).json(planetAdded);

        } catch(err) {
            return next(err);
        }
    }

    async deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        
        try {
            const deleteResult = await planetsRepository.delete(idPlanet);
            if(!deleteResult) {
                return next(httpError.NotFound(`Planet with id ${idPlanet} doesn't exist.`));
            } else {
                res.status(204).end();
            }
        } catch(err) {
            return next(err);
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