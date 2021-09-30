import objectToDotNotation from '../libs/objectToDotNotation.js';
import Observation from '../models/observation.model.js';
import dayjs from 'dayjs';

class ObservationsRepository {
    retrieveById(id) {
        return Observation.findById(id);
    }
    retrieveAll(filter) {
        return Observation.find(filter);
    }

    transform(observation, transformOptions = {}) {
        if(transformOptions.unit) {
            switch(transformOptions.unit) {
                case 'm':
                    break;
                case 's':
                    break;
                case 'f':
                    break;
            }
        }

        observation.observationDate = dayjs(observation.observationDate).format('YYYY-MM-DD');

        delete observation.__v;
        return observation;
    }
}

export default new ObservationsRepository();