import express from 'express';
import HttpError from 'http-errors';

import observationsRepository from '../repositories/observations.repository.js';

const router = express.Router();

class ObservationsRoutes {
    constructor() {
        router.get("/:stationName", this.getAll);
        router.get("/:stationName/:idObservation", this.getOne);
        router.post("/", this.post);
        router.delete("/:idObservation", this.delete);
    }

    async getAll(req, res, next){
        const filter = {
            'location.station': req.params.stationName.toString()
        };

        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'm' || unit === 's' || unit === 'f'){
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest(`Unit parameter '${unit}' is invalid.`));
            }
        }

        try {
            let observations = await observationsRepository.retrieveAll(filter);
            observations = observations.map(o => {
                o = o.toObject({getter:true, virtuals:false});
                o = observationsRepository.transform(o, transformOptions);
                return o;
            });

            res.status(200).json(observations);
        } catch(err) {
            return next(err);
        }


    }

    async getOne(req, res, next){

        const idObservation = req.params.idObservation;
        const filter = {
            'location.station': req.params.stationName.toString(),
            _id: idObservation
        };

        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'm' || unit === 's' || unit === 'f'){
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest(`Unit parameter '${unit}' is invalid.`));
            }
        }

        try {
            let observation = await observationsRepository.retrieveById(filter);
            
            if(!observation)
                return next(HttpError.NotFound(`Observation with id ${idObservation} doesn't exist.`));
            else{
                observation = observation.toObject({getters:true, virtuals:false});
                observation = observationsRepository.transform(observation, transformOptions);

                res.status(200).json(observation);
            }
            
        } catch(err) {
            return next(err);
        }
    }

    async post(req, res, next){
        const newObservation = req.body;

        if(Object.keys(newObservation).length === 0)
            return next(HttpError.BadRequest("Observation can't be empty"));

        try {
            let observationAdded = await observationsRepository.create(newObservation);
            observationAdded = observationAdded.toObject({getters:true, virtuals:false});
            observationAdded = observationsRepository.transform(observationAdded);

            res.status(201).json(observationAdded);
        } catch(err) {
            return next(err);
        }
    }

    delete(req, res, next){
        return next(HttpError.MethodNotAllowed('Delete method is not allowed.'));
    }
}

new ObservationsRoutes();
export default router;