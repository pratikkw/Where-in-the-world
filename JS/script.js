"use strict";

const darkModeBtn = document.getElementById("darkmode");

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("darkmode");
});

document
  .getElementById("location__icon")
  .addEventListener("click", function () {
    document
      .querySelector(".suggestion__box")
      .classList.toggle("suggestion__box--active");
  });

///////////////
const imgs = document.querySelectorAll(".imgs__box > img");
const btnLeft = document.querySelector(".arrow--left");
const btnRight = document.querySelector(".arrow--right");
const dots = document.querySelector(".dots");

// imgs.forEach((item, ind) => {
//   item.style.transform = `translateX(${ind * 100}%)`;
// });

let curSlide = 0;
let maxSlide = imgs.length - 1;

const createDots = function () {
  const arr = [...imgs];
  const dot = arr.map((item, ind) => {
    const ele = document.createElement("button");
    ele.className = "btn--dot";
    ele.dataslide = ind;

    return ele;
  });
  dot.forEach((item) => dots.prepend(item));
};
createDots();

const moveSlide = function (slide) {
  document
    .querySelectorAll(".btn--dot")
    .forEach((item) => item.classList.remove("btn--dot--active"));
  document
    .querySelectorAll(".btn--dot")
    [slide].classList.add("btn--dot--active");
  imgs.forEach((item, ind) => {
    item.style.transform = `translateX(${(ind - slide) * 100}%)`;
  });
};
moveSlide(0);

const moveSlidePlus = function () {
  if (curSlide === 0) {
    curSlide++;
  } else if (curSlide === maxSlide) {
    curSlide = 0;
  }
  moveSlide(curSlide);
};

const moveSlideMinus = function () {
  if (curSlide === maxSlide) {
    curSlide--;
  } else if (curSlide === 0) {
    curSlide = maxSlide;
  }
  moveSlide(curSlide);
};

btnRight.addEventListener("click", function () {
  moveSlidePlus();
  moveSlide(curSlide);
});

btnLeft.addEventListener("click", function () {
  moveSlideMinus();
  moveSlide(curSlide);
});
