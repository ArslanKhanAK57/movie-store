

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
            createdDate : new Date(),
            updateDate : new Date()
        });

        newMovie.save(function(err) {
            next();
        });
    };

    var removeMovieById = function(movieId, next) {
        movie.remove({_id : movieId}, function(err) {
            next();
        })
    };

    var editMovie = function(movieId, movieToBeEdited, next) {
        console.log(movieId);
        console.log(movieToBeEdited);
        movie.findOneAndUpdate({_id : movieId}, {
            $set: {
                name: movieToBeEdited.name,
                writer: movieToBeEdited.writer,
                director: movieToBeEdited.director,
                producer: movieToBeEdited.producer,
                editor: movieToBeEdited.editor,
                actors: movieToBeEdited.actors,
                year: movieToBeEdited.year,
                status: movieToBeEdited.status,
                updateDate: new Date()
            }
        }, function(err, movie) {
            next();
        });
    };

    return {
        findMovies : findMovies,
        findOne : findOne,
        addNewMovie : addNewMovie,
        removeMovieById: removeMovieById,
        editMovie : editMovie
    };

};