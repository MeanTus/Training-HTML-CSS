const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const range = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumb = document.querySelector(".music-thumb");
const musicImg = document.querySelector(".music-thumb img");
const repeatBtn = document.querySelector(".play-repeat");
let isRepeat = false;
let isPlaying = true;
let indexSong = 0;
let countRepeat = 0;
let timer;

// Data bài hát
const listMusic = [
    {
        id: 1,
        name: "holo",
        file: "holo.mp3",
        img: "https://images.unsplash.com/photo-1644424235641-6c8ba0592af7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
        id: 2,
        name: "summer",
        file: "summer.mp3",
        img: "https://images.unsplash.com/photo-1553531384-2a97de235d45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80"
    },
    {
        id: 3,
        name: "spark",
        file: "spark.mp3",
        img: "https://images.unsplash.com/photo-1644543830763-6426ef191334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 4,
        name: "home",
        file: "home.mp3",
        img: "https://images.unsplash.com/photo-1564419431636-fe02f0eff7aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1668&q=80"
    }
];

// Chuyen bai hat
nextBtn.addEventListener("click", function(){
    changeSong(1);
})
prevBtn.addEventListener("click", function(){
    changeSong(-1);
})

// Handle phát hoặc dừng nhạc
playBtn.addEventListener("click", playMusic);
function playMusic () {
    if(isPlaying){
        song.play();
        musicThumb.classList.add("is-playing");
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        isPlaying = false;
        timer = setInterval(displayTimer, 1000);
    } else {
        song.pause();
        musicThumb.classList.remove("is-playing");
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        isPlaying = true;
        clearInterval(timer);
    }
}

// Khi kết thúc bài nhạc tự động chuyển bài mới
song.addEventListener("ended", handleEndedSong);
function handleEndedSong () {
    countRepeat++;
    if(isRepeat && countRepeat === 1){
        isPlaying = true;
        playMusic();
    } else {
        changeSong(1);
        countRepeat = 0;
    }
}

function changeSong(dir) {
    if(dir === 1) {
        indexSong++;
        if(indexSong >= listMusic.length){
            indexSong = 0;
        }
    } else if (dir === -1) {
        indexSong--;
        if(indexSong < 0){
            indexSong = listMusic.length - 1;
        }
    }
    init()
    isPlaying = true;
    playMusic();
}

// Format thời gian
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Hiển thị thời gian của bai nhạc
function displayTimer(){
    const {duration, currentTime} = song;
    remainingTime.textContent = formatTime(currentTime);
    range.max = duration;
    range.value = currentTime;
    if(!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTime(duration);
    }
}

// Tua bài nhạc
range.addEventListener("change", handleChangeCurrentTime);
function handleChangeCurrentTime () {
    song.currentTime = range.value;
}

// Handle repeat bài nhạc
repeatBtn.addEventListener("click", function() {
    if(isRepeat) {
        isRepeat = false;
        repeatBtn.removeAttribute("style");
    } else {
        isRepeat = true;
        repeatBtn.style.color = "red";
    }
})

function init(){
    displayTimer();
    song.setAttribute("src", `./music/${listMusic[indexSong].file}`);
    musicName.textContent = listMusic[indexSong].name;
    musicImg.setAttribute("src", `${listMusic[indexSong].img}`);
}
init();