"use strict";
const searchBtn = document.getElementById("search-icon");
const flagImg = document.getElementById("flag-img");
const coatOfArmsImg = document.getElementById("coatofarm-img");
const primaryName = document.getElementById("primary-name");
const officialName = document.getElementById("Officialname");
const population = document.getElementById("population");
const region = document.getElementById("region");
const subRegion = document.getElementById("sub-region");
const capital = document.getElementById("capital");
const continents = document.getElementById("continents");
const area = document.getElementById("area");
const currency = document.getElementById("currency");
const langSet = document.getElementById("lang");

// --> DarkMode
const body = document.querySelector("body");
const darkModeBtn = document.getElementById("darkmode");
let stateOfMode = localStorage.getItem("mode");

const activeMode = function () {
  body.classList.add("darkmode");
  localStorage.setItem("mode", "enable");
};

const deActiveMode = function () {
  body.classList.remove("darkmode");
  localStorage.setItem("mode", "disable");
};

if (stateOfMode === "enable") {
  activeMode();
}

darkModeBtn.addEventListener("click", function () {
  stateOfMode = localStorage.getItem("mode");
  console.log(stateOfMode);
  if (stateOfMode !== "enable") {
    activeMode();
  } else {
    deActiveMode();
  }
});
//////////////////////////////

// --> Slider
const images = document.querySelectorAll(".imgs__box > img");
const btnLeft = document.querySelector(".arrow--left");
const btnRight = document.querySelector(".arrow--right");
const dots = document.querySelector(".dots");

let curSlide = 0;
let maxSlide = images.length - 1;

const createDots = function () {
  const arr = [...images];
  const dot = arr.map((item, ind) => {
    const ele = document.createElement("button");
    ele.className = "btn-dot";
    ele.dataslide = ind;

    return ele;
  });
  dot.forEach((item) => dots.append(item));
};
createDots();

const moveSlide = function (slide) {
  const btnDots = document.querySelectorAll(".btn-dot");
  btnDots.forEach((item) => item.classList.remove("btn-dot--active"));
  btnDots[slide].classList.add("btn-dot--active");
  images.forEach((item, ind) => {
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
const btnSearch = document.getElementById("search-icon");
const inputCountry = document.getElementById("inputCountry");
const suggestion__box = document.querySelector(".suggestion__box");
const suggestion__subBox = document.querySelector(".suggestion__sub-box");
const suggestion__lists = document.querySelector(".suggestion__lists");
const neighboursList = document.querySelector(".neighbours > ul");

let countryName;
const countryNameData = async function () {
  const data = await fetch(`countryData.json`);
  const { countries } = await data.json();
  countryName = countries;
};
countryNameData();

const displayBorders = function (arr) {
  neighboursList.innerHTML = "";
  const borderCountries = arr.map((item) => {
    const ele = document.createElement("li");
    ele.className = "style-1";
    ele.textContent = item;
    return ele;
  });
  borderCountries.forEach((item) => neighboursList.append(item));
};

let bor;
const displayData = function (result) {
  curSlide = 0;
  moveSlide(curSlide);
  inputCountry.value = "";

  const [cap] = result.capital;
  const [conti] = result.continents;
  const [cur] = Object.values(result.currencies);
  const lang = Object.values(result.languages);
  if (result.borders) {
    bor = result.borders;
  } else {
    bor = ["No Borders"];
  }

  flagImg.src = result.flags.svg;
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
  langSet.textContent = lang;
  // console.log(bor);
  displayBorders(bor);
};

const getCountryData = async function (country) {
  const data = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const [result] = await data.json();
  displayData(result);
};

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
    inputCountry.value = e.target.textContent;
    let searchCountry = inputCountry.value;
    suggestion__lists.innerHTML = "";
    getCountryData(searchCountry);
  }
});

inputCountry.addEventListener("input", function () {
  const inputCountry = this.value;
  const filterCountry = countryName.filter((item) =>
    item.toLowerCase().startsWith(inputCountry.toLowerCase())
  );
  renderCountryList(filterCountry);

  if (inputCountry === "") {
    suggestion__lists.innerHTML = "";
    suggestion__box.classList.remove("suggestion__box--active");
  }
});

inputCountry.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;
  suggestion__lists.innerHTML = "";
  const str = this.value.trim();
  getCountryData(str);
});

searchBtn.addEventListener("click", function () {
  suggestion__lists.innerHTML = "";
  const str = inputCountry.value.trim();
  getCountryData(str);
});

//////////////////////////////
let a = " pratik ";
let b = a.trim();
console.log(a.length);
console.log(b.length);
