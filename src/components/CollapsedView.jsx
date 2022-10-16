import { Flex, Box, Text, Input, Button } from '@chakra-ui/react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

const CollapsedView = ({ address, setAddress, setCoordinates }) => {
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const coords = await getLatLng(results[0]);

    setAddress(results[0].formatted_address);

    setCoordinates({
      lat: coords.lat,
      lng: coords.lng,
    });
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
        searchOptions={{ types: ['(cities)'] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Box w='100%' position='relative'>
            <Input
              type='text'
              value={address}
              {...getInputProps({ placeholder: 'City, State' })}
              variant='outline'
              w='100%'
            />

            <Box position='absolute' w='100%' zIndex={1}>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((sug) => {
                const style = sug.active
                  ? { backgroundColor: '#57b2e6', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };

                return (
                  <Box
                    textAlign='left'
                    fontSize='sm'
                    p='2'
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
