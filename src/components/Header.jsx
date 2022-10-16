import { Flex, Box, Heading, Icon, Button, Text } from '@chakra-ui/react';
import { FaArrowLeft, FaCloudSun } from 'react-icons/fa';

const Header = ({
  isExpanded,
  setIsExpanded,
  tempType,
  setTempType,
  setAddress,
  setGeoLocateAddress,
}) => {
  const handleCollapse = () => {
    setAddress('');
    setGeoLocateAddress('');
    setIsExpanded(false);
  };
  return (
    <Flex
      p='2'
      justifyContent='space-between'
      alignItems='center'
      bg='#1994DA'
      borderTopLeftRadius='10px'
      borderTopRightRadius='10px'
      color='#ffffff'
    >
      {isExpanded && (
        <Box flex='1'>
          <Button size='sm' variant='unstyled' onClick={handleCollapse}>
            <Icon as={FaArrowLeft} />
          </Button>
        </Box>
      )}
      {!isExpanded && (
        <Box flex='1' fontSize='xl'>
          <Icon as={FaCloudSun} />
        </Box>
      )}

      <Box flex='3'>
        <Heading as='h1' fontWeight='medium' fontSize='lg'>
          Simple Weather
        </Heading>
      </Box>

      <Box flex='1'>
        <Button onClick={() => setTempType(!tempType)} variant='unstyled'>
          {tempType ? (
            <span>
              <Text as='b' mr='1' fontSize='xl'>
                °C
              </Text>
              <Text as='sub'>°F</Text>
            </span>
          ) : (
            <span>
              <Text as='b' mr='1' fontSize='xl'>
                °F
              </Text>
              <Text as='sub'>°C</Text>
            </span>
          )}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
