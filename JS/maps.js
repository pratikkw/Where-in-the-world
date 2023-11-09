"use strict";

window.addEventListener("load", function () {
  const mapObject = JSON.parse(localStorage.getItem("mapDetails"));
  const successful = function (e) {
    test([e.coords.latitude, e.coords.longitude]);
  };

  const unsuccessful = function () {
    alert("Location access denied. Please enable the location access.");
  };

  const userLocation = function () {
    navigator.geolocation.getCurrentPosition(successful, unsuccessful);
  };

  const test = function (latlng) {
    const map = L.map("map").setView(latlng, mapObject.view);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(latlng).addTo(map);
    marker
      .bindPopup(
        L.popup({ maxWidth: 250, minWidth: 100, className: `popup-style` })
      )
      .setPopupContent(`${mapObject.countryName}`)
      .openPopup();
  };

  mapObject.yourlocation === false
    ? test(mapObject.geoCoordinate)
    : userLocation();
});
