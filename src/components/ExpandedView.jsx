import { Flex, Box, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosSunny, IoIosCloudy, IoIosSnow, IoIosRainy } from 'react-icons/io';
import { RiDrizzleFill, RiThunderstormsFill } from 'react-icons/ri';

const ExpandedView = ({ weather, address, tempType }) => {
  const weatherCodes = [
    {
      code: 'Thunderstorm',
      icon: <Icon as={RiThunderstormsFill} />,
    },
    {
      code: 'Drizzle',
      icon: <Icon as={RiDrizzleFill} />,
    },
    {
      code: 'Rain',
      icon: <Icon as={IoIosRainy} />,
    },
    {
      code: 'Snow',
      icon: <Icon as={IoIosSnow} />,
    },
    {
      code: 'Atmosphere',
      icon: <Icon />,
    },
    {
      code: 'Clear',
      icon: <Icon as={IoIosSunny} />,
    },
    {
      code: 'Clouds',
      icon: <Icon as={IoIosCloudy} />,
    },
  ];
  const [tempConverted, setTempConverted] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);

  useEffect(() => {
    convertKelvin(tempType);
  }, [tempType]);

  const convertKelvin = (tempType) => {
    if (tempType && weather) {
      // Kelvin to Celsius formula
      // K - 273.15
      setTempConverted(Math.round(weather?.main.temp - 273.15));
      setFeelsLike(Math.round(weather?.main.feels_like - 273.15));
    } else {
      // Kelvin to Fahrenheit
      // 9/5 (K - 273) + 32
      setTempConverted(Math.round((9 / 5) * (weather?.main.temp - 273) + 32));
      setFeelsLike(Math.round((9 / 5) * (weather?.main.feels_like - 273) + 32));
    }
  };

  useEffect(() => {
    console.log('temp converted ->', tempConverted);
  }, [tempConverted]);

  console.log('weather ->', weather);
  return (
    <Flex h='100%' flexDir='column' justifyContent='center' alignItems='center'>
      <Box>
        {weatherCodes.map((code) => {
          if (code.code === weather.weather[0].main) {
            return code.icon;
          }
        })}
      </Box>
      <Box>
        {tempConverted}° {tempType ? 'C' : 'F'}
      </Box>
      <Box>{weather.weather[0].main}</Box>
      <Box>
        <Icon as={FaMapMarkerAlt} />
        {address}
      </Box>
      <Box>
        <Box>
          Feels Like {feelsLike}° {tempType ? 'C' : 'F'}
        </Box>
        <Box>{weather?.main?.humidity}% humidity</Box>
      </Box>
    </Flex>
  );
};

export default ExpandedView;
