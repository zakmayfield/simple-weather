import { Flex, Box, Text, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

const CollapsedView = () => {
  const [address, setAddress] = useState('');
  const [corrdinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddress(results[0].formatted_address);
    console.log(results);
  };

  return (
    <Flex
      h='100%'
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      px='10'
    >
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Box w='100%' position='relative'>
            <Input
              type='text'
              value={address}
              {...getInputProps({ placeholder: 'Enter address' })}
              variant='outline'
              w='100%'
            />

            <Box position='absolute' zIndex={1}>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((sug) => {
                const style = sug.active
                  ? { backgroundColor: '#4bc2c5', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };

                return (
                  <Box
                    textAlign='left'
                    fontSize='sm'
                    key={sug.placeId}
                    {...getSuggestionItemProps(sug, {
                      style,
                    })}
                  >
                    {sug.description}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </PlacesAutocomplete>

      <Text fontSize='sm' my='2.5' fontWeight='medium' color='#00000080'>
        - or -
      </Text>

      <Button colorScheme='twitter' w='full'>
        Locate Me
      </Button>
    </Flex>
  );
};

export default CollapsedView;
