import Exploration from '../models/exploration.model.js';
import planetModel from '../models/planet.model.js';
import planetRepository from './planet.repository.js';

class ExplorationsRepository {
    
    retrieveById(idExploration, retrieveOptions) {
        
        const retrieveQuery = Exploration.findById(idExploration);

        if(retrieveOptions.planet) {
            retrieveQuery.populate('planet');
        }

        return retrieveQuery;
    }

    transform(exploration, transformOptions = {}) {
        if(transformOptions.embed && transformOptions.embed.planet)
        {
            planetRepository.transform(exploration.planet);
        } else {
            exploration.planet = { href: `/planets/${exploration.planet}`};
        }
        exploration.href = `/explorations/${exploration._id}`;
        delete exploration._id;

        return exploration;
    }

}

export default new ExplorationsRepository();