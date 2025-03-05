document.addEventListener("DOMContentLoaded", function () {
    // Sidebar Toggle for Mobile
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.createElement("button");
    sidebarToggle.classList.add("sidebar-toggle-btn");
    sidebarToggle.innerHTML = "☰";
    document.body.appendChild(sidebarToggle);

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Dark Mode Toggle
    const darkModeBtn = document.querySelector(".toggle-dark-mode");
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Music Player
    const audioPlayer = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const progressBar = document.getElementById("progress-bar");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const songTitle = document.getElementById("song-title");

    let songIndex = 0;
    let songs = [];

    // Get all song elements
    document.querySelectorAll(".playlist-card").forEach((card, index) => {
        let songSrc = card.getAttribute("src");
        let songCover = card.querySelector("img").src;
        let songName = card.querySelector("p").innerText;

        songs.push({ src: songSrc, cover: songCover, title: songName });

        // Play song on click
        card.addEventListener("click", () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
    });

    function loadSong(song) {
        audioPlayer.src = song.src;
        songTitle.innerText = song.title;
    }

    function playSong() {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseSong() {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    playPauseBtn.addEventListener("click", () => {
        if (audioPlayer.paused) {
            playSong();
        } else {
            pauseSong();
        }
    });

    nextBtn.addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    });

    prevBtn.addEventListener("click", () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });

    progressBar.addEventListener("input", () => {
        audioPlayer.currentTime = (progressBar.value * audioPlayer.duration) / 100;
    });

    // Auto-play next song when current song ends
    audioPlayer.addEventListener("ended", () => {
        nextBtn.click();
    });

    // Load the first song by default
    if (songs.length > 0) {
        loadSong(songs[0]);
    }
});
