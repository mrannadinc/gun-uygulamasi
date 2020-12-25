const addParticipantBtn = document.getElementById("add-btn");
const choiseBtn = document.getElementById("random-btn");
const clearBtn = document.getElementById("clear-btn");
const movieList = document.getElementById('random-list');

const movies = [];

const clearParticipants = () => {
  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  movies.splice(0, movies.length);
};

const renderRandomParticipant = () => { //it is a default value while noting coming to the function
  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  movies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info } = movie;
    // const { title: movieTitle } = info;
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie);
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + `${key}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl); //very important section
  });

};

const addParticipantHandler = () => {
  const title = document.getElementById("title").value;

  const newMovie = {
    info: { 
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      }
    }, 
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title;
    }
  };

  newMovie.info.title = title; //getter - setter 
  // console.log(newMovie.info.title);

  movies.push(newMovie);
  renderRandomParticipant();
};

const randomChoiseHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderRandomParticipant();
};

const clearParticipantHandler = () => {
  clearParticipants();
};

addParticipantBtn.addEventListener('click', addParticipantHandler);
choiseBtn.addEventListener('click', randomChoiseHandler);
clearBtn.addEventListener('click', clearParticipantHandler);


