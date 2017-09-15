module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var audit = new Schema({
        id : Schema.ObjectId,
        action : String,
        movieId : String,
        customerId : String,
        createdDate : Date
    });

    return mongoose.model('audit', audit);
};