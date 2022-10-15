# Simple app to read weather data

## Packages

- `react-places-autocomplete`

## API

- `Google Places API` * consumed by the `react-places-autocomplete` library

## Formulas

`Kelvin -> F`

- 9/5 (K - 273) + 32
  - EX: `9/5 (286.45 - 273) + 32 = 56.21F`

`Kelvin -> C`

- K - 273.15
  - EX: `286.45 - 273.15 = 13.33C`


### Flow

- Typing the Input hits the Places API

  - Places API gives us all locational data from their selection
    - 

  - Location data can be achieved from this meaning if you search 'Norwood Ohio' then i can just take that data from places API and use it for the current location searched.