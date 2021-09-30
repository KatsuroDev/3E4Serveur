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
        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'm' || unit === 's' || unit === 'f'){
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest(`Unit parameter '${unit}' is invalid.`));
            }
        }
    }

    getOne(req, res, next){

    }

    post(req, res, next){

    }

    delete(req, res, next){
        return next(HttpError.MethodNotAllowed('Delete method is not allowed.'));
    }
}

new ObservationsRoutes();
export default router;