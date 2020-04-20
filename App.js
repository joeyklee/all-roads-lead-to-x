class App {
  constructor(options = {}) {
    this.MAPBOX_NAV_API_URL = `https://api.mapbox.com/directions/v5/mapbox/walking`;
    this.MAPBOX_API_KEY = `pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw`;

    this.options = {
      container: options.container || "app",
      style: options.style || "mapbox://styles/mapbox/streets-v11",
      center: options.center || [-73.987308, 40.693378],
      zoom: options.zoom || 12,
      radius: options.radius || 2,
      radiusResolution: options.radiusResolution || 10,
      units: options.units || "kilometers",
      cellSize: options.cellSize || 1,
    };

    this.map = null;
  }

  async init() {
    mapboxgl.accessToken = this.MAPBOX_API_KEY;
    this.createMap();
  }

  async generateRoutes() {
    if (!this.map.isStyleLoaded) {
      console.log("not ready yet");
      await this.generateRoutes();
    }
    
    // get radial routes
    // const coords = await this.getRadialCoordinates();
    // const routes = await this.getAll(coords);
    // this.render(routes);

    // get point grid routes
    const coords = this.getGridCoordinates();
    const routes = await this.getAll(coords);
    this.render(routes);

    return routes;
  }

  createMap() {
    this.map = new mapboxgl.Map({
      container: this.options.container, // container id
      style: this.options.style, // stylesheet location
      center: this.options.center, // starting position [lng, lat]
      zoom: this.options.zoom, // starting zoom
    });
  }

  async getDirections(_destination) {
    const origin = `${this.options.center[0]},${this.options.center[1]}`;
    const destination = `${_destination[0]},${_destination[1]}`;
    const params = `${origin};${destination}?geometries=geojson`;

    const directionsRequest = `${this.MAPBOX_NAV_API_URL}/${params}&access_token=${this.MAPBOX_API_KEY}`;

    const result = await fetch(directionsRequest);
    const data = await result.json();

    if (!data.routes || !data.routes.length > 0) {
      return null;
    }

    const route = data.routes[0];
    const coordinates = route.geometry.coordinates;

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    };

    return geojson;
  }

  async getAll(coords) {
    let requests = coords.map((coord) => this.getDirections(coord));
    const output = await Promise.all(requests);
    const collection = turf.featureCollection(output);

    return collection;
  }

  getRadialCoordinates() {
    const radius = this.options.radius;
    const options = { steps: this.radiusResolution, units: this.options.units };
    const circle = turf.circle(this.options.center, radius, options);

    const coords = turf.getCoords(circle);
    return coords[0];
  }

  getGridCoordinates() {
    const radius = this.options.radius;
    const options = { steps: this.radiusResolution, units: this.options.units };
    const circle = turf.circle(this.options.center, radius, options);

    // get bbox of circle
    const bbox = turf.bbox(circle);
    // create grid of points within the bbox
    const cellSize = this.options.cellSize;
    const grid = turf.pointGrid(bbox, cellSize, { units: this.options.units });

    const coords = grid.features.map((feature) => feature.geometry.coordinates);
    return coords;
  }

  render(data) {
    // Add a single point to the map

    this.map.addSource("myLine", {
      type: "geojson",
      data: data,
    });

    this.map.addLayer({
      id: "myLine",
      type: "line",
      source: "myLine",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#F72060",
        "line-width": 4,
        "line-opacity": 0.8,
      },
    });
  }
}
