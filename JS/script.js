"use strict";

// ------------------------------------------
// BODY
const body = document.querySelector("body");

// ERROR
const displayErrorBox = document.querySelector(".display__error");
const errorMsg = document.querySelector(".errormsg");

// BUTTONs
const closeErrorBtn = document.querySelector(".wrong__icon");
const darkModeBtn = document.getElementById("darkmode");
const locationBtn = document.getElementById("location__icon");
const searchBtn = document.getElementById("search-icon");
const btnLeft = document.querySelector(".arrow--left");
const btnRight = document.querySelector(".arrow--right");
const globeBtn = document.getElementById("globe-btn");

// SEARCH BAR
const inputCountry = document.getElementById("inputCountry");
const suggestion__box = document.querySelector(".suggestion__box");
const suggestion__subBox = document.querySelector(".suggestion__sub-box");
const suggestion__lists = document.querySelector(".suggestion__lists");

// SLIDER
const dots = document.querySelector(".dots");

// IMAGEs
const flagImg = document.getElementById("flag-img");
const coatOfArmsImg = document.getElementById("coatofarm-img");
const sliderImgs = document.querySelectorAll(".imgs__box > img");

// SHOW DETAILs
const primaryName = document.getElementById("primary-name");
const officialName = document.getElementById("Officialname");
const population = document.getElementById("population");
const region = document.getElementById("region");
const subRegion = document.getElementById("sub-region");
const capital = document.getElementById("capital");
const continents = document.getElementById("continents");
const area = document.getElementById("area");
const currency = document.getElementById("currency");
const language = document.getElementById("lang");
const seeOnMapText = document.querySelector(".highlight-2-text");

// NEIGHBOURs list
const neighboursList = document.querySelector(".neighbours > ul");
// ------------------------------------------

// --> GLOBAL VARIABLEs
let geoCoordinate;
let curSlide = 0;
let maxSlide = sliderImgs.length - 1;
let countryName;
let border;
let clearErrorTimeout;
// ------------------------------------------

// --> MOST USED FUNCTIONs
// ------------------------------------------

// --> DarkMode
let stateOfMode = localStorage.getItem("mode");

const onAndOff = function (status) {
  body.classList.toggle("darkmode");
  localStorage.setItem("mode", `${status}`);
};

stateOfMode === "enable" ? onAndOff("enable") : "";
darkModeBtn.addEventListener("click", function () {
  stateOfMode = localStorage.getItem("mode");
  stateOfMode !== "enable" ? onAndOff("enable") : onAndOff("disable");
});
//////////////////////////////

// --> Slider
const createDots = function () {
  [...sliderImgs]
    .map((item, ind) => {
      const ele = document.createElement("button");
      ele.className = "btn-dot";
      ele.dataslide = ind;

      return ele;
    })
    .forEach((item) => dots.append(item));
};
createDots();

const moveSlide = function (slide) {
  const btnDots = document.querySelectorAll(".btn-dot");
  btnDots.forEach((item) => item.classList.remove("btn-dot--active"));
  btnDots[slide].classList.add("btn-dot--active");
  sliderImgs.forEach((item, ind) => {
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

btnRight.addEventListener("click", moveSlidePlus);
btnLeft.addEventListener("click", moveSlideMinus);
dots.addEventListener("click", function (e) {
  if (e.target.className !== "btn-dot") return;
  curSlide = e.target.dataslide;
  moveSlide(curSlide);
});
//////////////////////////////

// --> Search Suggestion
const countryNameData = async function () {
  const data = await fetch(`countryData.json`);
  const { countries } = await data.json();
  countryName = countries;
};
countryNameData();

const displayBorders = function (arr) {
  neighboursList.innerHTML = "";
  arr
    .map((item) => {
      const ele = document.createElement("li");
      ele.className = "style-1";
      ele.textContent = item;
      return ele;
    })
    .forEach((item) => neighboursList.append(item));
};

const getBorderFullname = async function (arrayBorder) {
  const data = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${arrayBorder.join(",")}`
  );
  const res = await data.json();
  const storeName = res.map((item) => item.name.common);
  displayBorders(storeName);
};

const displayData = function (result) {
  geoCoordinate = result.latlng;
  inputCountry.blur();
  curSlide = 0;
  moveSlide(curSlide);
  inputCountry.value = "";

  const [cap] = result.capital;
  const [conti] = result.continents;
  const [cur] = Object.values(result.currencies);
  const lang = Object.values(result.languages).map((item, ind, arr) => {
    const ele = document.createElement("span");
    ele.className = "ans";
    ele.textContent = `${item},`;
    return ele;
  });
  border = result.borders ? result.borders : ["No Borders"];

  flagImg.src = result.flags.svg;
  flagImg.alt = result.flags.alt;
  coatOfArmsImg.src = result.coatOfArms.svg;
  primaryName.textContent = result.name.common;
  officialName.textContent = result.name.official;
  population.textContent = result.population;
  region.textContent = result.region;
  subRegion.textContent = result.subregion;
  capital.textContent = cap;
  continents.textContent = conti;
  area.textContent = result.area;
  currency.textContent = `${cur.symbol} (${cur.name})`;
  lang.forEach((item) => language.prepend(item));
  seeOnMapText.textContent = result.name.common;

  border.every((item) => item === "No Borders")
    ? displayBorders(border)
    : getBorderFullname(border);
};

const autoClose = function () {
  displayErrorBox.classList.remove("display__error--active");
};

const showError = function (str) {
  clearTimeout(clearErrorTimeout);
  inputCountry.value = "";
  errorMsg.innerHTML = `Country with name <span class="highlight">${str}</span> does not exist!`;
  displayErrorBox.classList.add("display__error--active");
  clearErrorTimeout = setTimeout(autoClose, 3000);
};

closeErrorBtn.addEventListener("click", function () {
  displayErrorBox.classList.remove("display__error--active");
  clearTimeout(clearErrorTimeout);
});

const getCountryData = async function (country) {
  try {
    const data = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    if (!data.ok) throw new Error(country);
    const [result] = await data.json();
    displayData(result);
  } catch (e) {
    showError(e.message);
  }
};
getCountryData("india");

const renderCountryList = function (arr) {
  suggestion__lists.innerHTML = "";
  suggestion__box.classList.add("suggestion__box--active");
  arr
    .map((item) => {
      const ele = document.createElement("li");
      ele.className = "suggest__list";
      ele.textContent = item;
      return ele;
    })
    .forEach((item) => suggestion__lists.prepend(item));
};

suggestion__lists.addEventListener("click", function (e) {
  if (e.target.className === "suggest__list") {
    suggestion__lists.innerHTML = "";
    getCountryData(e.target.textContent);
  }
});

inputCountry.addEventListener("input", function () {
  const filterCountry = countryName.filter((item) =>
    item.toLowerCase().startsWith(inputCountry.value.toLowerCase())
  );
  renderCountryList(filterCountry);

  if (inputCountry.value === "") {
    suggestion__lists.innerHTML = "";
    suggestion__box.classList.remove("suggestion__box--active");
  }
});

const searchCountry = function () {
  suggestion__lists.innerHTML = "";
  const str = inputCountry.value.trim();
  if (str === "") return;
  getCountryData(str);
};

inputCountry.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;
  searchCountry();
});

searchBtn.addEventListener("click", searchCountry);

neighboursList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.className !== "style-1") return;
  getCountryData(e.target.textContent);
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
});
//////////////////////////////
