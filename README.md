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

## API

- `OpenWeather API`

- `Google Places API` \* consumed by the `react-places-autocomplete` library

- Native `GeoLocation API`

- `OpenCage Geocoding API`

## Formulas

`Kelvin -> F`

- 9/5 (K - 273) + 32
  - EX: `9/5 (286.45 - 273) + 32 = 56.21F`

`Kelvin -> C`

- K - 273.15
  - EX: `286.45 - 273.15 = 13.33C`


## Ideas

- Search History

  - Create a dropdown for recent searches (or rather a use last searched option)

--

- Persisting users Degrees selection
  
  - Create a custom useLocalStorage hook to persist the C/F selection.

--

- Dark mode

  - This should be pretty similar to the local storage hook, create a toggle that gets added to local storage when selecting which style you want to see

--

- Smooth opening of the extended box

  - Animate the transition from collapsed to expanded and vise versa