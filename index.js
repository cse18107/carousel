const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
// slides[0].style.left = slideWidth*0 + 'px';
// slides[1].style.left = slideWidth*1 + 'px';
// slides[2].style.left = slideWidth*2 + 'px';

// for (let i =0; i<slides.length;i++) {
//     slides[i].style.left = slideWidth*i +'px';
// }

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (
  track,
  currentSlide,
  targetSlide,
  currentNav,
  targetNav
) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
  if (currentNav && targetNav) {
    currentNav.classList.remove("current-slide");
    targetNav.classList.add("current-slide");
  }
};

// when I click left, move slides to the left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentNav = dotsNav.querySelector(".current-slide");
  const previousNav = currentNav.previousElementSibling;
  moveToSlide(track, currentSlide, previousSlide, currentNav, previousNav);
});

// when I click right, move slides to the right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentNav = dotsNav.querySelector(".current-slide");
  const nextNav = currentNav.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide, currentNav, nextNav);
});

// when I click the nav indicators, move to the slide
dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
});
