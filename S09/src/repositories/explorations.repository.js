import Exploration from '../models/exploration.model.js';
import planetRepository from './planet.repository.js';

class ExplorationsRepository {
    
    retrieveAll(retrieveOptions)
    {
        const retrieveQuery = Exploration.find().skip(retrieveOptions.skip).limit(retrieveOptions.limit);
        const countQuery = Exploration.estimatedDocumentCount();

        return Promise.all([retrieveQuery, countQuery]);
    }
    
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
            exploration.planet = planetRepository.transform(exploration.planet, transformOptions);
        } else {
            exploration.planet = { href: `/planets/${exploration.planet}`};
        }
        exploration.href = `/explorations/${exploration._id}`;
        delete exploration._id;

        return exploration;
    }

}

export default new ExplorationsRepository();