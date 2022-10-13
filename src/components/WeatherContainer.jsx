import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import CollapsedView from './CollapsedView';
import ExpandedView from './ExpandedView';
import Header from './Header';

const WeatherContainer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);

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
      {!isExpanded && <CollapsedView />}
      {isExpanded && <ExpandedView />}
    </Flex>
  );
};

export default WeatherContainer;
