import mongoose, { mongo } from 'mongoose';

const observationSchema = mongoose.Schema({
    location: {
        station: {type:String, required:true, index:true},
        coord: {
            lat: {type:Number, required:true},
            lon: {type:Number, required:true}
        }
    }
}, {
    collection:"observations",
    strict:"throw"
});

export default mongoose.model('Observation', observationSchema);