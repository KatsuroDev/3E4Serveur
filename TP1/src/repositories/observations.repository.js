import objectToDotNotation from '../libs/objectToDotNotation.js';
import Observation from '../models/observation.model.js';
import dayjs from 'dayjs';
import planetModel from '../../../S04/src/models/planet.model.js';

const ZERO_KELVIN = 273.15;
const FAHRENHEIT_MULTIPLIER = 1.8;
const FAHRENHEIT_CONSTANT = 32;

class ObservationsRepository {
    cardinalAngles = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

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

        // Créer un nouvelle objet pour storer les résultats des calculs du hexMatrix.
        observation.hex = {};

        observation.hex.alpha = parseInt(observation.hexMatrix.reduce((prev, curr) => prev += curr), 16);
        observation.hex.beta = parseInt(observation.hexMatrix.reduce((prev, curr) => prev *= curr), 16);
     
        if(observation.hex.alpha === 0)
            observation.hex.gamma = 0;
        else
            observation.hex.gamma = observation.hex.beta / observation.hex.alpha;

        observation.hex.delta = observation.hex.beta % observation.hex.alpha;


        // Assigner les lettres de la fleur des vents, dépendement du résultat de l'algorithme.
        observation.wind.direction = this.cardinalAngles[(Math.floor((observation.wind.degree - 22.5) / 45.0)+1) % 8];

        delete observation.hexMatrix;
        delete observation.__v;
        return observation;
    }
}

export default new ObservationsRepository();