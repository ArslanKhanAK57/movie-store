module.exports = function(mongoose) {

    var user = new mongoose.Schema({
        id : mongoose.Schema.ObjectId,
        email : String,
        password : String
    });

    return mongoose.model('user', user);
};