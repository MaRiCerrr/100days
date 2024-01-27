const yourDate = new Date("2023-10-20T00:00:00");
  
const music = ['duongtoichoemve'];

document.addEventListener('DOMContentLoaded', function(){
  
      var rootTime = document.querySelector("time");
      document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}`;
      document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" Ngày";
  
      function olock() {
          var today = new Date(),
              hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
              min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
              sec =  Math.floor((today - yourDate) / 1000) % 60;
          rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
      } 
      olock();
  
      var timer = setInterval(function(){olock()}, 1000);
  
      const audio = document.getElementById("audio");
      const playPauseButton = document.getElementById("play-pause");
      const prevButton = document.getElementById("prev");
      const nextButton = document.getElementById("next");
      const seekBar = document.getElementById("seek-bar");
      const volumeBar = document.getElementById("volume-bar");
      const songTitleElement = document.getElementById("song-title");
      const artistElement = document.getElementById("artist");
      const albumArtElement = document.getElementById("album-art");
      const playlistItems = document.querySelectorAll("#playlist li");
      var formattedTime = new Date().toLocaleTimeString();
  
      let currentSongIndex = 0;
  
      function playPause() {
          if (audio.paused) {
              audio.play();
          } else {
              audio.pause();
          }
      }
  
      function updatePlayPauseButton() {
          if (audio.paused) {
              playPauseButton.textContent = "Play";
          } else {
              playPauseButton.textContent = "Pause";
          }
      }
  
      function playNextSong() {
          currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
          loadSong(currentSongIndex);
      }
  
      function playPrevSong() {
          currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
          loadSong(currentSongIndex);
      }
  
      function loadSong(index) {
          const selectedSong = playlistItems[index].getAttribute("data-src");
          const selectedTitle = playlistItems[index].getAttribute("data-title");
          const selectedArtist = playlistItems[index].getAttribute("data-artist");
          const selectedImage = playlistItems[index].getAttribute("data-image");
  
          audio.src = selectedSong;
  
          songTitleElement.textContent = selectedTitle;
          artistElement.textContent = selectedArtist;
          albumArtElement.src = selectedImage;
  
          playPause(); // Call playPause function to start playing the loaded song
          updatePlayPauseButton(); // Update play/pause button text
      }
  
      function updateSeekBar() {
          seekBar.value = (audio.currentTime / audio.duration) * 100;
      }
  
      function updateVolume() {
          audio.volume = volumeBar.value / 100;
      }
  
      function updateCurrentTime() {
          document.getElementById("current-time").textContent = formatTimes(audio.currentTime);
          document.getElementById("total-duration").textContent = formatTimes(audio.duration);
      }
  
      function formatTimes(time) {
          let min = Math.floor(time / 60);
          if (min < 10) {
              min = `0${min}`;
          }
          let sec = Math.floor(time % 60);
          if (sec < 10) {
              sec = `0${sec}`;
          }
          return `${min}:${sec}`;
      }
  
      playPauseButton.addEventListener("click", function () {
          playPause();
          updatePlayPauseButton();
      });
      nextButton.addEventListener("click", playNextSong);
      prevButton.addEventListener("click", playPrevSong);
      seekBar.addEventListener("input", function () {
          audio.currentTime = (seekBar.value / 100) * audio.duration;
      });
      volumeBar.addEventListener("input", updateVolume);
  
      audio.addEventListener("timeupdate", () => {
          updateSeekBar();
          updateCurrentTime();
      });
  
      audio.addEventListener("ended", playNextSong);
      loadSong(currentSongIndex);

      const volumeButton = document.getElementById("volume");
      const volumeIcon = volumeButton.querySelector("i");
  
      function toggleMute() {
          if (audio.muted) {
              audio.muted = false;
              volumeIcon.classList.remove("fa-volume-mute");
              volumeIcon.classList.add("fa-volume-up");
          } else {
              audio.muted = true;
              volumeIcon.classList.remove("fa-volume-up");
              volumeIcon.classList.add("fa-volume-mute");
          }
      }
  
      volumeButton.addEventListener("click", toggleMute);
  
  }, false);
  


const memories = document.querySelector(".card");
for (let i = 1; i <= 124; i++) {
  const img = document.createElement("img");
  img.src = "img/" + i + ".jpg";
  memories.appendChild(img);
}

var currentVideoIndex = 1;
var totalVideos = 28;
var videosPerPage = 2;

function playVideos(startIndex) {
    var videoContainer = document.querySelector(".video-container");
    videoContainer.innerHTML = "";

    for (var i = 0; i < videosPerPage; i++) {
        var videoIndex = startIndex + i;

        // Kiểm tra nếu đã hết playlist, quay lại đầu tiên
        if (videoIndex > totalVideos) {
            videoIndex = videoIndex - totalVideos;
        }

        var video = document.createElement("video");
        video.id = "video" + videoIndex;
        video.controls = true;
        video.autoplay = false;

        var source = document.createElement("source");
        source.src = "video/" + videoIndex + ".mp4";
        source.type = "video/mp4";

        video.appendChild(source);
        videoContainer.appendChild(video);
    }
}

function preVideos() {
    currentVideoIndex -= videosPerPage;

    // Kiểm tra nếu đã quay lại video đầu tiên, giữ nguyên vị trí của video đầu tiên
    if (currentVideoIndex < 1) {
        currentVideoIndex = 1;
    }

    playVideos(currentVideoIndex);
}

  

function nextVideos() {
    currentVideoIndex += videosPerPage;

    // Kiểm tra nếu đã hết playlist, quay lại đầu tiên
    if (currentVideoIndex > totalVideos) {
        currentVideoIndex = 1;  // Quay lại video đầu tiên
    }

    playVideos(currentVideoIndex);
}


// Bắt đầu hiển thị 4 video đầu tiên
playVideos(currentVideoIndex);
