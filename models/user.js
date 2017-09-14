module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var user = new Schema({
        id : Schema.ObjectId,
        email : String,
        password : String
    });

    return mongoose.model('user', user);
};