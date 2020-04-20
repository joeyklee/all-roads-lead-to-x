let app;
window.addEventListener("DOMContentLoaded", async () => {
  const options = {
    mapboxAccessToken: `pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw`,
    mapboxNavigationURL: `https://api.mapbox.com/directions/v5/mapbox/walking`,
    container: "app",
    style: "mapbox://styles/mapbox/light-v10", // outdoors-v11, streets-v11
    center: [-73.987308, 40.693378], // [2.335195541381836,48.86290791986464],
    zoom: 12,
    radius: 3,
    units: "kilometers",
    radiusResolution: 10,
    cellSize: 0.5,
  };

  app = new App(options);
  await app.init();
  await app.generateGridRoutes();
  // await app.generateRadialRoutes();
});
