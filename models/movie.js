module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var movie = new Schema({
        name : String,
        writer : String,
        director : String,
        producer : String,
        editor : String,
        actors : String,
        year : Number,
        status : String,
        timesRented : Number,
        currentlyRentedBy : String,
        createdDate : Date,
        updateDate : Date
    });

    return mongoose.model('movie', movie);
};