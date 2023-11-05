"use strict";

const darkModeBtn = document.getElementById("darkmode");

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("darkmode");
});
