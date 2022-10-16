import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CollapsedView from './CollapsedView';
import ExpandedView from './ExpandedView';
import Header from './Header';
import axios from 'axios';
import opencage from 'opencage-api-client';

const WeatherContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // tempType : TRUE === C & FALSE === F
  const [tempType, setTempType] = useState(true);

  const [address, setAddress] = useState('');
  const [geoLocateAddress, setGeoLocateAddress] = useState('');

  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
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

  useEffect(() => {
    callOpenCage(coordinates.lat, coordinates.lng);
    // eslint-disable-next-line
  }, [coordinates]);

  const callOpenCage = (lat, lon) => {
    opencage
      .geocode({
        q: `${lat}, ${lon}`,
        key: '4cf0f5f55bd7487e935f15ca4c209938',
      })
      .then((data) => {
        if (data.results[0].formatted !== 'Null Island') {
          if (!address) {
            setGeoLocateAddress(data.results[0].formatted);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Flex
      w={{ base: '350px' }}
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
        setAddress={setAddress}
        setGeoLocateAddress={setGeoLocateAddress}
      />
      {!isExpanded && (
        <CollapsedView
          address={address}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
      )}
      {isExpanded && currentWeatherData && (address || geoLocateAddress) && (
        <ExpandedView
          weather={currentWeatherData}
          address={address}
          tempType={tempType}
          geoLocateAddress={geoLocateAddress}
        />
      )}
    </Flex>
  );
};

export default WeatherContainer;
