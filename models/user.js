module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var user = new Schema({
        email : String,
        password : String,
        role : String,
        address : String,
        name : String,
        status : String,
        createdDate : Date
    });

    return mongoose.model('user', user);
};