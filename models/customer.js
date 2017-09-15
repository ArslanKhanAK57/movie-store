module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var customer = new Schema({
        id : Schema.ObjectId,
        userId : String,
        totalRented : Number,
        createdDate : Date
    });

    return mongoose.model('customer', customer);
};