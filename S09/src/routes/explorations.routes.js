import express from 'express';
import HttpError from 'http-errors';
import explorationsRepository from '../repositories/explorations.repository.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    getAll(req, res, next) {

    }

    async getOne(req, res, next) {
        const retrieveOptions = {};
        const transformOtions = { embed:{} };
        if(req.query.embed && req.query.embed === 'planet') {
            retrieveOptions.planet = true;
            transformOtions.embed.planet = true;
        }

        try {
            const idExploration = req.params.explorationId;
            let exploration = await explorationsRepository.retrieveById(idExploration, retrieveOptions);
            if(!exploration) {
                return next(HttpError.NotFound());
            }

            exploration = exploration.toObject({getters: false, virtuals: false});
            exploration = explorationsRepository.transform(exploration, transformOtions);
            res.status(200).json(exploration);


        } catch(err) {
            return next(err);
        }
    }

}

new ExplorationsRoutes();

export default router;