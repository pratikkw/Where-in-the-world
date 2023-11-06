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
