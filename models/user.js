module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var user = new Schema({
        id : Schema.ObjectId,
        email : String,
        password : String,
        role : String,
        address : String,
        name : String,
        status : String,
        createDate : Date
    });

    return mongoose.model('user', user);
};