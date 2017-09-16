

module.exports = function (movie) {

    var findMovies = function(query, next) {
        movie.find(query, function(err, movies) {
            next(movies);
        })
    };

    var findOne = function(query, next) {
        movie.findOne(query, function(err, movie){
            next(err, movie);
        });
    };

    var addNewMovie = function(movieToBeAdded, next) {
        var newMovie = new movie({
            name : movieToBeAdded.name,
            writer : movieToBeAdded.writer,
            director : movieToBeAdded.director,
            producer : movieToBeAdded.producer,
            editor : movieToBeAdded.editor,
            actors : movieToBeAdded.actors,
            year : movieToBeAdded.year,
            status : 'ACTIVE',
            timesRented : 0,
            currentlyRentedBy : null,
            createdDate : new Date()
        });

        newMovie.save(function(err) {
            next();
        });
    };

    return {
        findMovies : findMovies,
        findOne : findOne,
        addNewMovie : addNewMovie
    };

};