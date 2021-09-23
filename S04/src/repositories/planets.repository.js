import objectToDotNotation from '../libs/objectToDotNotation.js';
import Planet from '../models/planet.model.js';
import dayjs from 'dayjs'

const ZERO_KELVIN = -273.15;

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
    create(planet) {
        return Planet.create(planet);
    }
    delete(id) {
        return Planet.findByIdAndDelete(id);
    }
    update(id, modif) {
        const planetToDotNotation = objectToDotNotation(modif);
        return Planet.findByIdAndUpdate(id, planetToDotNotation, {new:true});
    }
    transform(planet, transformOptions = {}) {
        if(transformOptions.unit) {
            switch(transformOptions.unit) {
                case 'c':
                    planet.temperature += ZERO_KELVIN;
                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;
            }
        }

        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');
        planet.lightspeed = `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`;

        delete planet.__v;

        return planet;
    }
}

export default new PlanetsRepository();