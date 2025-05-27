const songs = [
  {
    title: "Adding the Sun",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/Adding.the.Sun.mp3",
  },

  {
    title: "Dream Catcher",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1446813768824-b3730a9d5840?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/Dream.Catcher.mp3",
  },

  {
    title: "The Ice Giants",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1525396723185-6410140f6f98?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/The.Ice.Giants.mp3",
  },

  {
    title: "Glitter Blast",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1526722190017-4f91f105e2b2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/Glitter.Blast.mp3",
  },

  {
    title: "Magistar",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/Magistar.mp3",
  },

  {
    title: "Midnight Tale",
    artist: "Kevin MacLeod",
    thumbnail:
      "https://images.unsplash.com/photo-1706713417278-f56e1fd147e4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/Mdowel/music-player/releases/download/v1.0/Midnight.Tale.mp3",
  },
];

const titleEl = document.querySelector("#title");
const artistEl = document.querySelector("#artist");
const thumbnailEl = document.querySelector("#thumbnail");
const progressEl = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const totalTimeEl = document.querySelector("#total-time");
const repeatBtn = document.querySelector("#repeat-btn");
const prevBtn = document.querySelector("#prev-btn");
const playToggleBtn = document.querySelector("#play-toggle-btn");
const nextBtn = document.querySelector("#next-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
const playlistEl = document.querySelector("#playlist");

const songsEls = [];
let activeSongIndex = undefined;

getPlaylist();

playToggleBtn.addEventListener("click", () => {
  togglePlayBtn();
});

nextBtn.addEventListener("click", () => {
  stopPlayingSong();
  document
    .querySelector("#playlist button.font-bold")
    .classList.remove("font-bold");

  activeSongIndex++;
  if (activeSongIndex > songs.length - 1) {
    activeSongIndex = songs.length - 1;
  }
  setSongDetails(songs[activeSongIndex]);
  playlistEl
    .querySelectorAll("button")
    [activeSongIndex].classList.add("font-bold");
  togglePlayBtn();
  songsEls[activeSongIndex].play();
});

prevBtn.addEventListener("click", () => {
  stopPlayingSong();
  document
    .querySelector("#playlist button.font-bold")
    .classList.remove("font-bold");

  activeSongIndex--;
  if (activeSongIndex < 0) {
    activeSongIndex = 0;
  }
  setSongDetails(songs[activeSongIndex]);
  playlistEl
    .querySelectorAll("button")
    [activeSongIndex].classList.add("font-bold");
  togglePlayBtn();
  songsEls[activeSongIndex].play();
});

const originalOrder = [...songs];

shuffleBtn.addEventListener("click", () => {
  stopPlayingSong();

  const shuffledSongs = [...songs];
  if (!shuffleBtn.classList.contains("active")) {
    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSongs[i], shuffledSongs[j]] = [
        shuffledSongs[j],
        shuffledSongs[i],
      ];
    }
    songs.length = 0;
    songs.push(...shuffledSongs);

    shuffleBtn.classList.add("active", "text-blue-700");
  } else {
    songs.length = 0;
    songs.push(...originalOrder);
    shuffleBtn.classList.remove("active", "text-blue-700");
  }
  getPlaylist();
});

repeatBtn.addEventListener("click", () => {
  if (!repeatBtn.classList.contains("active")) {
    songsEls[activeSongIndex].loop = true;
    songsEls[activeSongIndex].play();
    repeatBtn.classList.add("active", "text-blue-700");
  } else {
    repeatBtn.classList.remove("active", "text-blue-700");
    songsEls[activeSongIndex].loop = false;
  }
});

function getPlaylist() {
  playlistEl.innerHTML = "";
  songsEls.length = 0;

  songs.forEach((song, index) => {
    const songBtn = document.createElement("button");
    const songEl = document.createElement("audio");

    songsEls.push(songEl);

    songBtn.className = "w-full py-2 flex justify-between hover:font-bold";
    songEl.src = song.url;
    // add each song to playlist
    playlistEl.appendChild(songBtn);
    playlistEl.appendChild(songEl);

    songEl.addEventListener("loadedmetadata", () => {
      const { duration } = songEl;
      const time = getReadableTime(duration);

      song.time = time;

      songBtn.innerHTML = `${song.title} <span>${time}</span>`;

      // set default song
      if (index === 0) {
        activeSongIndex = index;
        setSongDetails(song);
        songBtn.classList.add("font-bold");
      }
    });

    // update progress bar
    songEl.addEventListener("timeupdate", () => {
      const { currentTime } = songEl;
      updateProgress(currentTime);
    });

    // autoplay next song
    songEl.addEventListener("ended", function () {
      activeSongIndex = activeSongIndex + 1;
      setSongDetails(songs[activeSongIndex]);
      songsEls[activeSongIndex].play();

      document
        .querySelector("#playlist button.font-bold")
        .classList.remove("font-bold");
      playlistEl
        .querySelectorAll("button")
        [activeSongIndex].classList.add("font-bold");
    });

    // change song on song title click
    songBtn.addEventListener("click", () => {
      document
        .querySelector("#playlist button.font-bold")
        .classList.remove("font-bold");

      songBtn.classList.add("font-bold");
      stopPlayingSong();

      activeSongIndex = index;
      setSongDetails(song);
    });

    // preload images
    const hiddenImageEl = document.createElement("img");
    hiddenImageEl.src = song.thumbnail;
    hiddenImageEl.classList.add("hidden");
    document.body.appendChild(hiddenImageEl);
  });
}

function updateProgress(time) {
  progressEl.value = (time / songsEls[activeSongIndex].duration) * 100;
  currentTimeEl.innerText = getReadableTime(time);
}

function setSongDetails(song) {
  songsEls[activeSongIndex].currentTime = 0;
  currentTimeEl.innerText = "0:00";
  progressEl.value = 0;
  titleEl.innerText = song.title;
  artistEl.innerText = song.artist;
  thumbnailEl.src = song.thumbnail;
  totalTimeEl.innerText = song.time;
}

function getReadableTime(duration) {
  return `${Math.floor(duration / 60)}:${`${Math.floor(
    duration % 60
  )}`.padStart(2, "0")}`;
}

function stopPlayingSong() {
  songsEls[activeSongIndex].pause();
  playToggleBtn.classList.remove("play");
}

function togglePlayBtn() {
  if (songsEls[activeSongIndex].paused) {
    songsEls[activeSongIndex].play();
    playToggleBtn.classList.add("play");
  } else {
    songsEls[activeSongIndex].pause();
    playToggleBtn.classList.remove("play");
  }
}
