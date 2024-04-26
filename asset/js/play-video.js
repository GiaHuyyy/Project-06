// Play video
const play = document.querySelector("#play");
const video = document.querySelector("#video");
const introVideo = document.querySelector("#interactive__intro");
let firstClick = true;
play.addEventListener("click", () => {
    showAttributeControls();
    playVideo();
});
video.addEventListener("click", () => {
    showAttributeControls();
});
video.addEventListener("play", () => {
    play.style.display = "none";
    introVideo.style.transform = `translateX(${110}%)`;
});
video.addEventListener("pause", () => {
    play.style.display = "flex";
    introVideo.style.transform = `translateX(${0})`;
});
// Play video for btn play
function playVideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
// First click Add attribute controls and play video
function showAttributeControls() {
    if (firstClick) {
        video.setAttribute("controls", "true");
        play.style.display = "none";
        introVideo.style.transform = `translateX(${110}%)`;
        firstClick = false;
    }
}
