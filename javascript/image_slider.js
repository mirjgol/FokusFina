// ***************************IMAGE SLIDER************************** 
// slider select


const slider = document.querySelector(".img-slider-container");

// select all slides


function getAllSlides() {
  return document.querySelectorAll(".img-slider-container .slide");
}

// controls event listeners

document.querySelector(".left").addEventListener("click", moveLeft);
document.querySelector(".right").addEventListener("click", moveRight);
document.querySelector(".play-pause").addEventListener("click", playPause);

// variables


let currentSlide = 1;
let automaticSlide = false;
let automaticSlideTimer;

// controlFunctions



function moveRight() {
  const allSlides = getAllSlides();
  slider.append(allSlides[0]);
  changeCurrentSlide("right");
  updateTitle();
}

function moveLeft() {
  const allSlides = getAllSlides();
  slider.prepend(allSlides[allSlides.length - 1]);
  changeCurrentSlide("left");
  updateTitle();
}

// slide function current


function changeCurrentSlide(direction) {
  const allSlides = getAllSlides();

  if (direction === "right") {
    currentSlide === allSlides.length ? (currentSlide = 1) : currentSlide++;
  } else {
    currentSlide === 1 ? (currentSlide = allSlides.length) : currentSlide--;
  }

  // h2 text change


  document.querySelector(".slides-title").innerText = `Slide ${currentSlide}`;
}

// title


function updateTitle() {
  const allSlides = getAllSlides();
  const title = allSlides[0].querySelector(".slider-img").alt;
  document.querySelector(".controls-container h2").innerText = title;
}

// autoslider function 3 seconds 

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

// autoslide

function startAutoSlide() {
  automaticSlideTimer = setInterval(moveRight, 3000); 
  automaticSlide = true;
}


updateTitle();
startAutoSlide();

