# Simple app to read weather data

## Packages

- `react-places-autocomplete`

  - Autocomplete search input for google maps locations on a city level

- `opencage-api-client`

  - Geolocating Lat and Lng coordinates

- `@chakra-ui/react`
  - Styling
- `axios`
  - HTTP requests

---

## API

- `OpenWeather API`

- `Google Places API` \* consumed by the `react-places-autocomplete` library

- Native `GeoLocation API`

- `OpenCage Geocoding API`

---

## Formulas

`Kelvin -> F`

- 9/5 (K - 273) + 32
  - EX: `9/5 (286.45 - 273) + 32 = 56.21F`

`Kelvin -> C`

- K - 273.15
  - EX: `286.45 - 273.15 = 13.33C`

---

## Potential Issues

- POSSIBLE CACHING ISSUE

  - In order to use the places API key it needs to be public (public HTML file). This required me to host the page on GitHub pages and add a restriction to my key, a 'no caching' meta tag was added to the HTML file so i could have my changes reflected quickly

    - This method did not work right away so i will be removing those caching meta tags when my build finally updates

---

## Want to change

- Size of the map marker is a bit too big, should be around same size as text

- Need to have more margin above the footer, or under the address w/ map marker

---

## Bugs

- Warning coming from react that is telling me there is a missing dep array in WeatherContainer.jsx, I fixed the issue for this on a different useEffect by making the function it was referencing a useCallback instead

  - _Note this is still an issue, except it wont be display because of an eslint ignore line i added_

---

## Ideas

- Persisting users Degrees selection

  - Create a custom useLocalStorage hook to persist the C/F selection.

--

- Dark mode

  - This should be pretty similar to the local storage hook, create a toggle that gets added to local storage when selecting which style you want to see

---

## STRETCH GOALS

- Search History

  - Create a dropdown for recent searches (or rather a use last searched option)

--

- Smooth opening of the extended box

  - Animate the transition from collapsed to expanded and vise versa
