import { Flex, Box, Icon, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosSunny, IoIosCloudy, IoIosSnow, IoIosRainy } from 'react-icons/io';
import { RiDrizzleFill, RiThunderstormsFill } from 'react-icons/ri';
import rain from '../assets/rain.png';
import clouds from '../assets/clouds.png';
import clear from '../assets/clear.png';
import thermometer from '../assets/thermometer.png';
import humidity from '../assets/humidity.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snow.png';
import thunderstorm from '../assets/thunderstorm.png';
import atmosphere from '../assets/atmosphere.png';

const ExpandedView = ({ weather, address, tempType, geoLocateAddress }) => {
  const weatherCodes = [
    {
      code: 'Thunderstorm',
      icon: <Icon as={RiThunderstormsFill} />,
      imgSrc: thunderstorm,
    },
    {
      code: 'Drizzle',
      icon: <Icon as={RiDrizzleFill} />,
      imgSrc: drizzle,
    },
    {
      code: 'Rain',
      icon: <Icon as={IoIosRainy} />,
      imgSrc: rain,
    },
    {
      code: 'Snow',
      icon: <Icon as={IoIosSnow} />,
      imgSrc: snow,
    },
    {
      code: 'Atmosphere',
      icon: <Icon />,
      imgSrc: atmosphere,
    },
    {
      code: 'Clear',
      icon: <Icon as={IoIosSunny} />,
      imgSrc: clear,
    },
    {
      code: 'Clouds',
      icon: <Icon as={IoIosCloudy} />,
      imgSrc: clouds,
    },
  ];
  const [tempConverted, setTempConverted] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);

  const convertKelvin = useCallback(
    (tempType) => {
      if (tempType && weather) {
        // Kelvin to Celsius formula
        // K - 273.15
        setTempConverted(Math.round(weather?.main.temp - 273.15));
        setFeelsLike(Math.round(weather?.main.feels_like - 273.15));
      } else {
        // Kelvin to Fahrenheit
        // 9/5 (K - 273) + 32
        setTempConverted(Math.round((9 / 5) * (weather?.main.temp - 273) + 32));
        setFeelsLike(
          Math.round((9 / 5) * (weather?.main.feels_like - 273) + 32)
        );
      }
    },
    [weather]
  );

  useEffect(() => {
    convertKelvin(tempType);
  }, [tempType, convertKelvin]);

  if (!weather) return;

  return (
    <Flex
      h='100%'
      flexDir='column'
      justifyContent='space-between'
      alignItems='center'
    >
      {/* WEATHER CONDITION IMAGE */}
      <Flex w='100%' justifyContent='center' p='5'>
        {weatherCodes.map(
          (code) =>
            code.code === weather.weather[0].main && (
              <Image
                key={code.code}
                boxSize='150px'
                src={code.imgSrc}
                alt={`${code.code} weather`}
              />
            )
        )}
      </Flex>

      {/* DEGREES OF WEATHER */}
      <Box>
        <Text fontSize='xxx-large' as='b'>
          {tempConverted}° {tempType ? 'C' : 'F'}
        </Text>
      </Box>

      {/* WEATHER CONDITION */}
      <Box textTransform='capitalize'>{weather.weather[0].description}</Box>

      {/* LOCATION */}
      <Flex alignItems='center' justifyContent='center' w='100%' px='5'>
        <Icon mr='2' as={FaMapMarkerAlt} />
        <Text fontSize='md' id='address-display'>
          {address && !geoLocateAddress ? address : geoLocateAddress}
        </Text>
      </Flex>

      {/* FOOTER OF EXPANDED VIEW */}
      <Flex w='100%'>
        <Flex
          flex='1'
          py='3'
          flexDirection='column'
          borderTop='1px solid black'
          borderRight='1px solid black'
          justifyContent='center'
          alignItems='center'
        >
          <Flex justifyContent='center' alignItems='center'>
            <Image boxSize='25px' src={thermometer} />
            <Text ml='2' fontSize='lg'>
              {feelsLike}° {tempType ? 'C' : 'F'}
            </Text>
          </Flex>
          <Text mt='1' fontSize='xs'>
            Feels Like
          </Text>
        </Flex>

        <Flex
          flex='1'
          py='3'
          flexDirection='column'
          borderTop='1px solid black'
          justifyContent='center'
          alignItems='center'
        >
          <Flex justifyContent='center' alignItems='center'>
            <Image boxSize='25px' src={humidity} />
            <Text ml='2' fontSize='lg'>
              {weather?.main?.humidity}%
            </Text>
          </Flex>
          <Text mt='1' fontSize='xs'>
            Humidity
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ExpandedView;
