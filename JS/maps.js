"use strict";

const mapObject = JSON.parse(localStorage.getItem("mapDetails"));

const map = L.map("map").setView(mapObject.geoCoordinate, mapObject.view);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.marker(mapObject.geoCoordinate).addTo(map);
marker
  .bindPopup(
    L.popup({ maxWidth: 250, minWidth: 100, className: `popup-style` })
  )
  .setPopupContent(`${mapObject.countryName}`)
  .openPopup();
