import objectToDotNotation from '../libs/objectToDotNotation.js';
import Observation from '../models/observation.model.js';
import dayjs from 'dayjs';
import planetModel from '../../../S04/src/models/planet.model.js';

const ZERO_KELVIN = 273.15;
const FAHRENHEIT_MULTIPLIER = 1.8;
const FAHRENHEIT_CONSTANT = 32;

class ObservationsRepository {
    retrieveById(filter) {
        return Observation.findOne(filter);
    }
    retrieveAll(filter) {
        return Observation.find(filter);
    }

    create(observation) {
        return Observation.create(observation);
    }

    transform(observation, transformOptions = {}) {
        if(transformOptions.unit) {
            switch(transformOptions.unit) {
                case 's':
                    observation.temperature += ZERO_KELVIN;
                    observation.feelslike += ZERO_KELVIN;
                    break;
                case 'f':
                    observation.temperature = observation.temperature * FAHRENHEIT_MULTIPLIER + FAHRENHEIT_CONSTANT;
                    observation.feelslike = observation.feelslike * FAHRENHEIT_MULTIPLIER + FAHRENHEIT_CONSTANT;
                    break;
            }
        }

        observation.observationDate = dayjs(observation.observationDate).format('YYYY-MM-DD');

        delete observation.__v;
        return observation;
    }
}

export default new ObservationsRepository();