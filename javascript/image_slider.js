// ***************************IMAGE SLIDER************************** 
const slider = document.querySelector(".img-slider-container");

function getAllSlides() {
  return document.querySelectorAll(".img-slider-container .slide");
}

document.querySelector(".left").addEventListener("click", moveLeft);
document.querySelector(".right").addEventListener("click", moveRight);
document.querySelector(".play-pause").addEventListener("click", playPause);

let currentSlide = 1;
let automaticSlide = false;
let automaticSlideTimer;

function moveRight() {
  const allSlides = getAllSlides();
  slider.append(allSlides[0]); // Move first slide to the end
  changeCurrentSlide("right");
  updateTitle();
  resetTimer();
}

function moveLeft() {
  const allSlides = getAllSlides();
  slider.prepend(allSlides[allSlides.length - 1]); // Move last slide to the beginning
  changeCurrentSlide("left");
  updateTitle();
  resetTimer();
}

function changeCurrentSlide(direction) {
  const allSlides = getAllSlides();
  if (direction === "right") {
    currentSlide = currentSlide === allSlides.length ? 1 : currentSlide + 1;
  } else {
    currentSlide = currentSlide === 1 ? allSlides.length : currentSlide - 1;
  }
  document.querySelector(".slides-title").innerText = `Slide ${currentSlide}`;
}

function updateTitle() {
  const allSlides = getAllSlides();
  const currentSlideElement = allSlides[0];
  const title = currentSlideElement.querySelector(".slider-img").alt;
  document.querySelector(".slides-title").innerText = title;
}

function playPause() {
  if (automaticSlide) {
    clearInterval(automaticSlideTimer);
    automaticSlide = false;
    document.querySelector(".play-pause").innerText = "Play";
  } else {
    automaticSlideTimer = setInterval(moveRight, 3000);
    automaticSlide = true;
    document.querySelector(".play-pause").innerText = "Pause";
  }
}

function startAutoSlide() {
  automaticSlideTimer = setInterval(moveRight, 3000);
  automaticSlide = true;
}

function resetTimer(){
  if (automaticSlide){
    clearInterval(automaticSlideTimer);
    automaticSlideTimer = setInterval(moveRight, 3000);
  }
}

updateTitle();
startAutoSlide();

