# Barcelona Map App

*Barcelona Map App* is a single-page application bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It features a map of "El Born" – one of the most trendy neighborhoods in Barcelona – as well as a set of markers to identify popular venues to visit. The map funcionality is provided by [Google Maps](https://developers.google.com/maps/documentation/) API.

## Functionality

To facilitate the browsing of the locations, the user can toggle a panel with a list of the available venues and a filter for the locations. The filters are:

- All places
- Art Museum
- Bakery
- Bed & Breakfast
- Cafeteria
- Coffee Shop
- French Restaurant

Additional information about each of the locations can be displayed by clicking on a list item or a marker. This information is provided by [Foursquare](https://foursquare.com/) API.

When available in the browser, the app uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.


## Installation

From your console, clone the GitHub repository:
```sh
git clone https://github.com/albagon/bcn-map.git
```

Install all project dependencies with:
```sh
npm install
```

Now start the server and run the app in the development mode. This will automatically open `http://localhost:3000/` in your browser. The page will reload if you make edits and any lint errors will be logged in the console:
```sh
npm start
```

Build the app for production. This correctly bundles React in production mode and optimizes the build for the best performance:
```sh
npm run build
```

The app is ready to be deployed!

For more information about *deployment*, please visit [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## Contributing

This repository is the result of my final project for [Udacity](https://www.udacity.com/)'s Front-End Developer Nanodegree. Therefore, all contributions are welcome.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## License

_Barcelona Map App_ is distributed under the [MIT license](LICENSE).
