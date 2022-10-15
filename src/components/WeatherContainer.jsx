import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CollapsedView from './CollapsedView';
import ExpandedView from './ExpandedView';
import Header from './Header';
import axios from 'axios';

const WeatherContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // tempType : TRUE === C & FALSE === F
  const [tempType, setTempType] = useState(true);

  const [address, setAddress] = useState('');

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [currentWeatherData, setCurrentWeatherData] = useState({});

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=0e9761f8518e09fa0c0104e2cc2b3dc5`
        )
        .then((res) => {
          setCurrentWeatherData(res.data);
          setIsExpanded(true);
        })
        .catch((err) => {
          console.log('error ->', err);
        });
    }
  }, [coordinates]);

  return (
    <Flex
      w={{ base: '400px' }}
      h={isExpanded && currentWeatherData ? '500px' : '300px'}
      my='5'
      borderRadius='10px'
      bg='white'
      color='black'
      flexDirection='column'
    >
      <Header
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        tempType={tempType}
        setTempType={setTempType}
      />
      {!isExpanded && (
        <CollapsedView
          address={address}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
      )}
      {isExpanded && currentWeatherData && (
        <ExpandedView
          weather={currentWeatherData}
          address={address}
          tempType={tempType}
        />
      )}
    </Flex>
  );
};

export default WeatherContainer;
