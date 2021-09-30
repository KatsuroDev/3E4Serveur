import mongoose from 'mongoose';

const observationSchema = mongoose.Schema({
    location: {
        station: {type:String, required:true, index:true},
        coord: {
            lat: {type:Number, required:true},
            lon: {type:Number, required:true}
        }
    },
    temperature:Number,
    pressure:Number,
    humidity: {type:Number, min:0, max:1},
    feelslike:Number,
    uvIndex: {type:Number, min:0, max:11},
    wind: {
        speed:Number,
        degree: {type:Number, min:0, max:360}
    },
    clouds: {
        cloudcover: {type:Number, min:0, max:1}
    },
    observationDate: {type:Date, default: Date.now},
    hexMatrix: [String]

}, {
    collection:"observations",
    strict:"throw"
});

export default mongoose.model('Observation', observationSchema);