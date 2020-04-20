# All roads lead to X
> Demo of Mapbox Navigation API inspired by <a href="https://www.move-lab.com/project/roadstorome/">Moovel Lab</a> and <a href="https://jamesbridle.com/works/all-roads-lead-to-x">James Bridle</a>


| | | |
| :--- | --- | --- |
| ![screenshot of routes in grid to louvre](assets/Screenshot_2020-04-20%20All%20roads%20lead%20to%20X(10).png) | ![screenshot of radial routes to louvre](assets/Screenshot_2020-04-20%20All%20roads%20lead%20to%20X(11).png) | ![screenshot of routes to ITP](assets/Screenshot_2020-04-20%20All%20roads%20lead%20to%20X(12).png) |

## Setup

Tweak the parameters in `main.js` to see what happens!

**Make sure to add your own mapbox API key!!!**
```js
{
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
  }
```

NOTE: if you make the radius too large, you will max out the API calls. Similarly, if your cell size is too small, you'll also max out the API calls. You might think of more clever ways of handling chunking up your requests! This is just a demo!


## Credits
* Built by <a href="https://jk-lee.com">Joey Lee</a>
* [Mapbox directions demo](https://docs.mapbox.com/help/demos/directions-api/index.html)
  