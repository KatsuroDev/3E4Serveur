import Planet from '../models/planet.model.js';


class PlanetsRepository {
    retrieveById(id) {
        return Planet.findById(id);
    }
    retrieveAll(filter) {

        // WHERE SQL EQUIVALENT
        const testFilter = {
            discoveredBy:'Skadex',
            temperature: {$gt: 240},
            'position.y': {$lt: 500}
        }

        const testFilterOr = {
            $or:[
                {discoveredBy:'Skadex'},
                {temperature: {$gt: 240}}
            ],
            'position.y': {$lt:500}
        }
        
        return Planet.find(filter);
    }
}

export default new PlanetsRepository();