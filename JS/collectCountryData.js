"use strict";

// export script

export const countryData = async function () {
  const data = await fetch(
    `https://restcountries.com/v3.1/name/india?fullText=true`
  );
  const [result] = await data.json();
  console.log(result);
};
