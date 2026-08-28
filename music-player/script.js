const tracks = [
  { title: "Night Drive", artist: "Helix Lab", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "cover-1" },
  { title: "Low Light", artist: "Fern & Wire", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "cover-2" },
  { title: "After Hours", artist: "Quiet Press", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "cover-3" },
  { title: "Vernal Woods", artist: "Helia Marsh", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "cover-4" },
  { title: "Slow Orbit", artist: "North Room", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "cover-5" },
  { title: "Signal Bloom", artist: "Pulse Ensemble", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", cover: "cover-6" },
];

const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const searchResults = document.getElementById("searchResults");
const libraryList = document.getElementById("libraryList");
const playBtn = document.getElementById("playBtn");
const heroPlay = document.getElementById("heroPlay");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const likeBtn = document.getElementById("likeBtn");
const muteBtn = document.getElementById("muteBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const nowTitle = document.getElementById("nowTitle");
const nowArtist = document.getElementById("nowArtist");
const nowArt = document.getElementById("nowArt");
const heroArt = document.getElementById("heroArt");
const autoplayEl = document.getElementById("autoplay");
const trackCount = document.getElementById("trackCount");
const searchInput = document.getElementById("searchInput");
const searchHint = document.getElementById("searchHint");
const likedCount = document.getElementById("likedCount");
const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("scrim");
const menuBtn = document.getElementById("menuBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const mainEl = document.querySelector(".main");

let index = 0;
let isPlaying = false;
let shuffle = false;
let repeat = false;
let liked = new Set();
let seeking = false;
let view = "home";
const historyStack = ["home"];
let historyPos = 0;

trackCount.textContent = String(tracks.length);

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function paintRange(el, percent) {
  const p = Math.max(0, Math.min(100, percent));
  el.style.background = `linear-gradient(to right, var(--green) ${p}%, #4d4d4d ${p}%)`;
}

function setPlayIcons(playing) {
  document.querySelectorAll(".icon-play").forEach((el) => el.classList.toggle("hidden", playing));
  document.querySelectorAll(".icon-pause").forEach((el) => el.classList.toggle("hidden", !playing));
  playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
}

function paintCover(el, coverClass) {
  el.className = el === nowArt ? `now-art ${coverClass}` : `hero-art ${coverClass}`;
}

function closeMenu() {
  sidebar.classList.remove("open");
  scrim.hidden = true;
}

function openMenu() {
  sidebar.classList.add("open");
  scrim.hidden = false;
}

function setView(next, push = true) {
  view = next;
  document.querySelectorAll(".view").forEach((el) => {
    el.classList.toggle("hidden", el.id !== `view-${next}`);
  });
  document.querySelectorAll("[data-view]").forEach((el) => {
    if (el.classList.contains("lib-card") || el.classList.contains("playlist-chip")) return;
    el.classList.toggle("active", el.dataset.view === next);
  });
  mainEl.classList.toggle("search-bg", next === "search");
  mainEl.classList.toggle("library-bg", next === "library");
  closeMenu();
  if (push) {
    historyStack.splice(historyPos + 1);
    if (historyStack[historyPos] !== next) {
      historyStack.push(next);
      historyPos = historyStack.length - 1;
    }
  }
  backBtn.disabled = historyPos <= 0;
  forwardBtn.disabled = historyPos >= historyStack.length - 1;
  if (next === "search") {
    searchInput.focus();
    renderSearch();
  }
  if (next === "library") renderLibrary();
}

function trackRow(track, i) {
  return `
    <li class="track${i === index ? " active" : ""}" data-index="${i}">
      <span class="col-num">${i === index && isPlaying ? "▶" : i + 1}</span>
      <span>
        <div class="title">${track.title}</div>
        <div class="sub">${track.artist}</div>
      </span>
      <span class="artist-col">${track.artist}</span>
      <span class="track-dur" data-src="${track.src}">--:--</span>
    </li>`;
}

function bindRows(root) {
  root.querySelectorAll(".track").forEach((row) => {
    row.addEventListener("click", () => loadTrack(Number(row.dataset.index), true));
  });
  root.querySelectorAll(".track-dur").forEach((cell) => {
    const probe = new Audio();
    probe.preload = "metadata";
    probe.src = cell.dataset.src;
    probe.addEventListener("loadedmetadata", () => {
      cell.textContent = formatTime(probe.duration);
    });
  });
}

function renderPlaylist() {
  playlistEl.innerHTML = tracks.map((track, i) => trackRow(track, i)).join("");
  bindRows(playlistEl);
}

function renderSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const matches = tracks
    .map((track, i) => ({ track, i }))
    .filter(({ track }) => !q || track.title.toLowerCase().includes(q) || track.artist.toLowerCase().includes(q));
  searchHint.textContent = q
    ? matches.length
      ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
      : "No matches. Try another name."
    : "Try a song or artist name.";
  searchResults.innerHTML = matches.map(({ track, i }) => trackRow(track, i)).join("");
  bindRows(searchResults);
}

function renderLibrary() {
  likedCount.textContent = `${liked.size} liked`;
  libraryList.innerHTML = tracks.map((track, i) => trackRow(track, i)).join("");
  bindRows(libraryList);
}

function updateLikeUi() {
  const on = liked.has(index);
  likeBtn.classList.toggle("on", on);
  likeBtn.querySelector("path").setAttribute("fill", on ? "currentColor" : "none");
  likedCount.textContent = `${liked.size} liked`;
}

function loadTrack(nextIndex, autoStart = false) {
  index = (nextIndex + tracks.length) % tracks.length;
  const track = tracks[index];
  audio.src = track.src;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  paintCover(nowArt, track.cover);
  paintCover(heroArt, track.cover);
  updateLikeUi();
  renderPlaylist();
  if (view === "search") renderSearch();
  if (view === "library") renderLibrary();
  if (autoStart) play();
}

function play() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      setPlayIcons(true);
      renderPlaylist();
      if (view === "search") renderSearch();
      if (view === "library") renderLibrary();
    })
    .catch(() => {
      isPlaying = false;
      setPlayIcons(false);
    });
}

function pause() {
  audio.pause();
  isPlaying = false;
  setPlayIcons(false);
  renderPlaylist();
  if (view === "search") renderSearch();
  if (view === "library") renderLibrary();
}

function togglePlay() {
  if (!audio.src) loadTrack(index, true);
  else if (isPlaying) pause();
  else play();
}

function nextTrack() {
  if (shuffle) {
    let next = index;
    while (tracks.length > 1 && next === index) next = Math.floor(Math.random() * tracks.length);
    loadTrack(next, true);
    return;
  }
  loadTrack(index + 1, true);
}

function prevTrack() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  loadTrack(index - 1, isPlaying);
}

document.querySelectorAll("[data-view]").forEach((el) => {
  el.addEventListener("click", () => setView(el.dataset.view));
});

document.getElementById("brandBtn").addEventListener("click", () => setView("home"));
document.getElementById("brandBtn").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    setView("home");
  }
});

document.getElementById("likedCard").addEventListener("click", () => {
  setView("search");
  searchInput.value = "";
  const likedTracks = tracks.map((track, i) => ({ track, i })).filter(({ i }) => liked.has(i));
  searchHint.textContent = likedTracks.length ? "Liked songs" : "Like a song with the heart icon first.";
  searchResults.innerHTML = likedTracks.map(({ track, i }) => trackRow(track, i)).join("");
  bindRows(searchResults);
});

document.getElementById("userBtn").addEventListener("click", () => setView("library"));
menuBtn.addEventListener("click", () => (sidebar.classList.contains("open") ? closeMenu() : openMenu()));
scrim.addEventListener("click", closeMenu);

backBtn.addEventListener("click", () => {
  if (historyPos <= 0) return;
  historyPos -= 1;
  setView(historyStack[historyPos], false);
});

forwardBtn.addEventListener("click", () => {
  if (historyPos >= historyStack.length - 1) return;
  historyPos += 1;
  setView(historyStack[historyPos], false);
});

searchInput.addEventListener("input", renderSearch);

playBtn.addEventListener("click", togglePlay);
heroPlay.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle("on", shuffle);
});

repeatBtn.addEventListener("click", () => {
  repeat = !repeat;
  repeatBtn.classList.toggle("on", repeat);
});

likeBtn.addEventListener("click", () => {
  if (liked.has(index)) liked.delete(index);
  else liked.add(index);
  updateLikeUi();
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.classList.toggle("on", audio.muted);
});

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
  audio.muted = audio.volume === 0;
  paintRange(volume, Number(volume.value) * 100);
});

progress.addEventListener("input", () => {
  seeking = true;
  const pct = Number(progress.value);
  paintRange(progress, pct);
  currentTimeEl.textContent = formatTime((pct / 100) * (audio.duration || 0));
});

progress.addEventListener("change", () => {
  audio.currentTime = (Number(progress.value) / 100) * (audio.duration || 0);
  seeking = false;
});

audio.addEventListener("timeupdate", () => {
  if (seeking || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progress.value = String(pct);
  paintRange(progress, pct);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (repeat) {
    audio.currentTime = 0;
    play();
    return;
  }
  if (autoplayEl.checked) nextTrack();
  else {
    isPlaying = false;
    setPlayIcons(false);
    renderPlaylist();
  }
});

audio.volume = Number(volume.value);
paintRange(volume, Number(volume.value) * 100);
paintRange(progress, 0);
loadTrack(0, false);
setView("home", false);
