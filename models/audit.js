module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var audit = new Schema({
        action : String,
        movieId : String,
        customerId : String,
        createdDate : Date
    });

    return mongoose.model('audit', audit);
};