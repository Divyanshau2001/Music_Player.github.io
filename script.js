const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl  = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Array of objects for songs
const songs = [
    {
        name: 'Why Do I',
        displayName: 'Why Do I',
        artist: 'Unknown-Brains',
    },
    {
        name: 'Resonance',
        displayName: 'Resonance',
        artist: 'Home',
    },
    {
        name: 'Memory Lane',
        displayName: 'Meomry Lane',
        artist: 'Tobu',
    },
    {
        name: 'Cold',
        displayName: 'Cold',
        artist: 'Neffex',
    },
];


// For the Functionality of Play button
// Check if playing
let isPlaying = false;
//Play 
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
//pause 
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}
//Play or Pause event listener
playBtn.addEventListener('click',() => (isPlaying ? pauseSong(): playSong()));




//Next and Previous button Functionality 
//Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
//Current Song
let songIndex = 0;
// To load first song on starting website
loadSong(songs[songIndex]);
//Previous Song 
function prevSong(){
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//Next Song 
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}



// update progressbar and time
function updateProgressBar(e) {
    if(isPlaying){
        const{ duration, currentTime} = e.srcElement;
        //Update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
       
        //Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

         //Calculate display for current
         const currentMinutes = Math.floor(currentTime/60);
         let currentSeconds = Math.floor(currentTime % 60);
         if(currentSeconds < 10){
             currentSeconds = `0${currentSeconds}`;
         }
        
         currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}


//Functionality to change the progressbar width as we click on progressbar
//Set Progress Bar
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);