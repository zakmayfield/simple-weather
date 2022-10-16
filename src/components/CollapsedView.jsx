import { Flex, Box, Text, Input, Button, Icon } from '@chakra-ui/react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const CollapsedView = ({ address, setAddress, setCoordinates }) => {
  const [fetchingLocation, setFetchingLocation] = useState(null);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const coords = await getLatLng(results[0]);

    setAddress(results[0].formatted_address);

    setCoordinates({
      lat: coords.lat,
      lng: coords.lng,
    });
  };

  const geoLocate = () => {
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const successCallback = (position) => {
    setCoordinates({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setFetchingLocation(false);
  };

  const errorCallback = (error) => {
    setFetchingLocation(false);
    console.log('error', error);
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
              size='lg'
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

      <Text fontSize='sm' my='5' fontWeight='medium' color='#00000080'>
        - or -
      </Text>

      <Button
        onClick={geoLocate}
        colorScheme='twitter'
        w='full'
        size='lg'
        disabled={fetchingLocation}
      >
        {!fetchingLocation && 'Locate Me'}
        {fetchingLocation && <Icon className='spinner-icon' as={FaSpinner} />}
      </Button>
    </Flex>
  );
};

export default CollapsedView;
