import express from 'express';
import httpError from 'http-errors';
import httpStatus from 'http-status';

import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
       res.status(httpStatus.OK);
       res.json(ELEMENTS);
    }

    getOne(req, res, next) {
       const elementSymbol = req.params.symbol;
       const element = ELEMENTS.find(e => e.symbol == elementSymbol);

       if(!element) {
           return next(httpError.NotFound(`Element with symbol ${elementSymbol} doesn't exist.`));
       } else {
           res.status(httpStatus.OK);
           res.json(element);
       }
    }

    post(req, res, next) {
        const newElement = req.body;
        const element = ELEMENTS.find(e => e.symbol == newElement.symbol);

        if(element) {
            return next(httpError.Conflict(`An element with symbol ${newElement.symbol} already exists.`));
        } else {
            ELEMENTS.push(newElement);
            res.status(httpStatus.CREATED);
            res.json(newElement);
        }
    }
    
    delete(req, res, next) {
        const elementSymbol = req.params.symbol;

        const index = ELEMENTS.findIndex(e => e.symbol == elementSymbol);

        if(index === -1) {
            return next(httpError.NotFound(`Element with symbol ${elementSymbol} doesn't exist.`));
        } else {
            ELEMENTS.splice(index, 1);
            res.status(httpStatus.NO_CONTENT).end();
        }
    }
}

new ElementsRoutes();

export default router;