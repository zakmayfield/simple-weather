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
