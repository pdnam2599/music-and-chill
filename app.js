let playing = true;
let random = false;
const playButton = document.querySelector(".player-play");
const nextButton = document.querySelector(".player-next");
const prevButton = document.querySelector(".player-prev");
const thumbnail = document.querySelector(".player-image");
const song = document.querySelector("#song");
const songList = document.querySelectorAll(".song");
const songArtist = document.querySelector(".player-author");
const songTitle = document.querySelector(".player-title");
const progressBar = document.querySelector("#progress-bar");

let songIndex = 0;
let songs = [
  "./files/THANG-NAM.mp3",
  "./files/Buoc-qua-mua-co-don.mp3",
  "./files/Dung-Khoc-Mot-Minh.mp3",
  "./files/AiChoAi.mp3",
];
let thumbnails = [
  "https://cdn.dribbble.com/users/3960463/screenshots/13952774/media/1083c2b91054c7d7ee7c0bd47d60d5e0.png?compress=1&resize=800x600",
  "https://cdn.dribbble.com/users/3960463/screenshots/14808856/media/09a06e9c0d0f897dd9ea1f038541c495.png?compress=1&resize=1000x750",
  "https://cdn.dribbble.com/users/3960463/screenshots/14630140/media/c79331860d7ca1b97430a4888617f428.png?compress=1&resize=1000x750",
  "https://cdn.dribbble.com/users/3960463/screenshots/14516886/media/bc272ecce9bec415eb28b7fe65e99117.png?compress=1&resize=1000x750",
];
let songArtists = ["Soobin", "Vũ.", "Quang Hùng", "FloD"];
let songTitles = ["Tháng năm", "Bước qua mùa cô đơn", "Đừng khóc một mình", "#AiChoAi"];
let timer;
function handleClickEachSong(e) {
  const index = parseInt(e.target.dataset.index);
  nextSong(index);
}
function playPause() {
  if (playing) {
    const song = document.querySelector("#song");
    song.play();
    thumbnail.classList.add("is-playing");
    playButton.classList.add("fa-pause");

    playing = false;
  } else {
    thumbnail.classList.remove("is-playing");
    playButton.classList.remove("fa-pause");
    song.pause();
    playing = true;
    clearInterval(timer);
  }
}

function nextSong(index = -1) {
  if (index >= 0) {
    songIndex = index;
  } else {
    songIndex++;
  }
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];

  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 1;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}

function updateProgressValue() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector(".player-remaining").innerHTML = formatTime(
    Math.floor(song.currentTime)
  );
  if (document.querySelector(".player-duration").innerHTML === "NaN:NaN") {
    document.querySelector(".player-duration").innerHTML = "0:00";
  } else {
    document.querySelector(".player-duration").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
timer = setInterval(updateProgressValue, 500);
function changeProgressBar() {
  song.currentTime = progressBar.value;
}
progressBar.addEventListener("change", changeProgressBar);
playButton.addEventListener("click", playPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);
song.addEventListener("ended", function () {
  nextSong();
});

songList.forEach((el) => el.addEventListener("click", handleClickEachSong));
