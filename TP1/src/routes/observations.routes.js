import express from 'express';
import HttpError from 'http-errors';

const router = express.Router();

class ObservationsRoutes {
    constructor() {
        router.delete("/:idObservation", this.delete);
    }

    delete(req, res, next){
        return next(HttpError.MethodNotAllowed('Delete method is not allowed.'));
    }
}

new ObservationsRoutes();
export default router;