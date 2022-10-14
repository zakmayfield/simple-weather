import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CollapsedView from './CollapsedView';
import ExpandedView from './ExpandedView';
import Header from './Header';
import axios from 'axios';

const WeatherContainer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=0e9761f8518e09fa0c0104e2cc2b3dc5`
        )
        .then((res) => {
          console.log('response ->', res);
          setIsExpanded(true)
        })
        .catch((err) => {
          console.log('error ->', err);
        });
    }
  }, [coordinates]);

  return (
    <Flex
      w={{ base: '400px' }}
      h={isExpanded ? '500px' : '300px'}
      my='5'
      borderRadius='10px'
      bg='white'
      color='black'
      flexDirection='column'
    >
      <Header
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isCelsius={isCelsius}
        setIsCelsius={setIsCelsius}
      />
      {!isExpanded && (
        <CollapsedView
          address={address}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
      )}
      {isExpanded && <ExpandedView />}
    </Flex>
  );
};

export default WeatherContainer;
