// Model
function Festival() {
    this.listOfAllMovies = [];
    this.listOfprograms = [];
}

function Movie(title, length, genre) {
    this.title = title;
    this.length = parseInt(length);
    this.genre = genre;
}

Movie.prototype.genreTwoLetters = function () {
    var first = this.genre[0].toUpperCase();
    var last = this.genre[this.genre.length - 1].toUpperCase();

    return first + last;
}

Movie.prototype.getData = function () {
    return this.title + ', ' + this.length + 'min, ' + this.genreTwoLetters();
}

function Program(date) {
    this.date = new Date(date);
    this.listOfMovies = [];
}

Program.prototype.addMovie = function (movie) {
    if (!Movie || !(movie instanceof Movie)) {
        console.log('Invalid Input !');
        return;
    }
    this.listOfMovies.push(movie);
}

Program.prototype.getDate = function () {
    var day = this.date.getDate();
    var month = this.date.getMonth() + 1;
    var year = this.date.getFullYear();
    var valueDate = day + '.' + month + '.' + year;

    return valueDate;
}

Program.prototype.getTotalMoviesLength = function () {
    var sum = 0;
    this.listOfMovies.forEach(function (movie) {
        sum += movie.length;
    })
    return sum;
}

Program.prototype.getData = function () {
    return this.getDate() + ', ' + this.listOfMovies.length + ' movies, duration: ' + this.getTotalMoviesLength();
}




