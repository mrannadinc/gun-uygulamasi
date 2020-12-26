const addParticipantBtn = document.getElementById("add-btn");
const choiseBtn = document.getElementById("random-btn");
const clearBtn = document.getElementById("clear-btn");
const participantList = document.getElementById('normal-list');
const randomParticipantList = document.getElementById('random-list');

const participant = [];
const copyParticipant = [];
let nextRandom = -1;

const clearParticipants = () => {
  if (participant.length === 0) {
    participantList.classList.remove('visible');
    randomParticipantList.classList.remove('visible');
  } else {
    participantList.classList.add('visible');
    randomParticipantList.classList.add('visible');
  }
  participantList.innerHTML = '';
  randomParticipantList.innerHTML = '';
  participant.splice(0, participant.length);
  copyParticipant.splice(0, copyParticipant.length);
};

const renderParticipant = () => { //it is a default value while noting coming to the function
  if (participant.length === 0) {
    participantList.classList.remove('visible');
  } else {
    participantList.classList.add('visible');
  }
  participantList.innerHTML = '';
  participant.forEach((movie) => {
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
    participantList.append(movieEl); //very important section
  });
  //console.log(participant);
};

const renderRandomParticipant = () => { //it is a default value while noting coming to the function
  if (copyParticipant.length === 0) {
    randomParticipantList.classList.remove('visible');
  } else {
    randomParticipantList.classList.add('visible');
  }
  randomParticipantList.innerHTML = '';
  copyParticipant.forEach((movie) => {
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
    randomParticipantList.append(movieEl); //very important section
  });
  //console.log(participant);
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

  participant.push(newMovie);
  renderParticipant();
};

const randomChoiseHandler = () => {
  let index = Math.floor(Math.random() * participant.length); 
  
  if (participant.length !== 0){
    let arrayValue = participant[index];
    console.log(arrayValue);
    let index2 = participant.indexOf(arrayValue);
    console.log(index, arrayValue);
    participant.splice(index2, 1);
    copyParticipant.push(arrayValue);
    renderRandomParticipant();
  } else {
    alert ("Kura Sonuçlandı");
  }
  /*if (random !== nextRandom) {
    randomValue.push(random);
    const randomParticipant = participant[random];
    console.log(random, randomParticipant);
    participant.splice(randomParticipant,1);
    nextRandom = random;
    randomValue.splice(random,1);
  }*/
};

const clearParticipantHandler = () => {
  clearParticipants();
};

addParticipantBtn.addEventListener('click', addParticipantHandler);
choiseBtn.addEventListener('click', randomChoiseHandler);
clearBtn.addEventListener('click', clearParticipantHandler);


