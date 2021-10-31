// Controler
var festival = new Festival();

var inputTitle = document.getElementById('title');
var inputLength = document.getElementById('length');
var optionGenre = document.getElementById('genre');
var createMovieButton = document.getElementById('create-movie');
var paraErrorMessage = document.getElementById('para-error-message');
var listOfMovies = document.getElementById('listOfMovies');
var movieSelect = document.getElementById('movie-select');
var createProgram = document.getElementById('create-program');
var inputDate = document.getElementById('input-date');
var programError = document.getElementById('program-error');
var programSelect = document.getElementById('program-select');
var programList = document.getElementById('program-list');
var addMovieToProgram = document.getElementById('add-movie-to-program');



function createMovieFunction() {
    var titleValue = inputTitle.value;
    var lengthValue = inputLength.value;
    var genreValue = optionGenre.value;


    if (!titleValue || !lengthValue || !genreValue) {
        paraErrorMessage.textContent = 'You must fill all of the fields !';
        return;
    }

    paraErrorMessage.textContent = '';

    var movie = new Movie(titleValue, lengthValue, genreValue);
    festival.listOfAllMovies.push(movie);
    var indexOfMovie = festival.listOfAllMovies.length - 1;
    console.log(movie);

    var li = document.createElement('li');
    li.textContent = movie.getData();
    listOfMovies.append(li);

    var movieOptionElement = document.createElement('option');
    movieOptionElement.textContent = movie.title;
    movieOptionElement.setAttribute('value', indexOfMovie);
    movieSelect.appendChild(movieOptionElement);


    console.log(festival);
}


array = [];
function createProgramFunction() {
    var programDate = inputDate.value;
    console.log(programDate);



    var date = new Date(programDate);

    if (date.getTime() < (Date.now() - 86400000)) {
        programError.textContent = 'Invalid date !';
        console.log(Date.now());
        return;
    }
    if (array.includes(date.getTime())) {
        programError.textContent = 'That program already exists !';
        return;
    }

    if (!programDate) {
        programError.textContent = 'Date input is requared !';
        return;
    }

    programError.textContent = '';


    var program = new Program(date);
    festival.listOfprograms.push(program);
    var index = festival.listOfprograms.length - 1;

    var li = document.createElement('li');
    li.setAttribute('id', 'id-' + index);
    li.textContent = program.getData();
    programList.appendChild(li);


    var optionProgram = document.createElement('option');
    optionProgram.setAttribute('value', index);
    optionProgram.setAttribute('id', 'option-' + index);
    optionProgram.textContent = program.getData();
    programSelect.appendChild(optionProgram);

    array.push(date.getTime());



    console.log(array);
    console.log(festival);


}

function addMovieToProgramFunction() {

    var movieIndex = movieSelect.value;
    var programIndex = programSelect.value;

    var movie = festival.listOfAllMovies[movieIndex];
    var program = festival.listOfprograms[programIndex];
    var li = document.querySelector('#id-' + programIndex);
    var option = document.querySelector('#option-' + programIndex);

    program.addMovie(movie);
    li.textContent = program.getData();
    option.textContent = program.getData();

}



createMovieButton.addEventListener('click', createMovieFunction);
createProgram.addEventListener('click', createProgramFunction);
addMovieToProgram.addEventListener('click', addMovieToProgramFunction);



