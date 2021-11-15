const container = document.querySelector('.container');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.js-progress-range');
const progressBar = document.querySelector('.js-progress-bar');
const playBtn = document.querySelector('.js-play-btn');
const volumeIcon = document.querySelector('.js-volume-up');
const volumeRange = document.querySelector('.js-volume-range');
const volumeBar = document.querySelector('.js-volume-bar');
const speed = document.querySelector('.js-player-speed');
const currentTime = document.querySelector('.js-time-elapsed');
const duration = document.querySelector('.js-time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');


function showIconPlay() {
  playBtn.classList.replace('fa-pause', 'fa-play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
  }
  else {
    video.pause();
    showIconPlay();
  }
}


function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
  let newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

let lastVolume = 1;

function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeBar.style.width = 0;
  }
  else {
    video.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.className = '';
  if (volume > 0.5) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }
  else if (volume < 0.5 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }
  else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

function changeSpeed() {
  video.playbackRate = speed.value;
}


function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(container);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}


playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showIconPlay);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
