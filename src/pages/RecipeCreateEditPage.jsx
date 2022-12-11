import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react';

import { useState, useReducer, useEffect } from 'react';
import {
  formReducer,
  INITIAL_STATE,
} from '../components/RecipeCreateEdit/formReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import usePost from '../hooks/useFetch/usePost.js';
import BasicData from '../components/RecipeCreateEdit/BasicData';
import IngredientsEdit from '../components/RecipeCreateEdit/IngredientsEdit';
import { CustomToast } from '../components/Feedback/CustomToast';
import { formContext } from '../components/RecipeCreateEdit/formReducer';
import DirectionsMarkDown from '../components/MarkDown/DirectionsMarkDown';

const RecipeCreateEditPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const [url, setUrl] = useState('/recipes');

  const location = useLocation();
  //formReducer
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
    if (location.state && location.state.detail.detail) {
      dispatch({
        type: 'UPDATE_INIT_DATA',
        payload: location.state.detail.detail,
      });
      setUrl(`/recipes/${location.state.detail.detail._id}`);
    } else {
      setUrl('/recipes');
    }
  }, [location.state]);

  const isError = state.title === '';
  //pridani dat z formualre do formReduceru
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const { onSubmit, response, isLoading, error } = usePost(url, state);

  const { addToast } = CustomToast();

  useEffect(() => {
    if (error !== '') {
      addToast({ message: error.response.data.message, type: 'error' });
    }
    if (response && !isLoading) {
      addToast({ message: 'Nahrání receptu bylo úspěšné', type: 'success' });
      navigate(`/recept/${state.slug}`);
    }
  }, [error, response, isLoading]);

  const onSave = (e) => {
    if (state.title !== '') {
      e.preventDefault();
      dispatch({ type: 'SET_SLUG' });
      onSubmit();
    }
  };

  return (
    <formContext.Provider value={{ state, dispatch, handleChange }}>
      <Box px={5}>
        <form onSubmit={onSave}>
          <Box>
            <Stack
              my={4}
              direction={{ base: 'column', md: 'column', lg: 'row' }}
            >
              <Heading as="h1">
                {state.title === '' ? 'Nový recept' : state.title}
              </Heading>
              <Spacer />
              <Box textAlign="right">
                <Button
                  type="submit"
                  mr={2}
                  colorScheme="whatsapp"
                  disabled={isError}
                >
                  Save
                </Button>
                <Button onClick={handleNavigate}>Cancel</Button>
              </Box>
            </Stack>
          </Box>
          <Box mb={5}>
            <FormControl isInvalid={isError} mb={5}>
              <Input
                value={state.title}
                type="text"
                name="title"
                placeholder="Název"
                onChange={handleChange}
              />
              {!isError ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Název je povinný</FormErrorMessage>
              )}
            </FormControl>
            {/* form-start */}
            <Stack direction={{ base: 'column', md: 'column', lg: 'row' }}>
              {/* LEFT */}
              <BasicData />
              {/* middle */}
              <IngredientsEdit />
              {/* right  */}
              <Flex direction="column" h="40vh" w={{ md: '90vw', xl: '70vw' }}>
                <Heading as="h2" size="md" fontWeight="normal">
                  Postup
                </Heading>
                <Textarea
                  style={{ height: '100%' }}
                  type="text"
                  resize={'none'}
                  value={state.directions}
                  name="directions"
                  onChange={handleChange}
                />
              </Flex>
            </Stack>
          </Box>
          <Box>
            <Heading as="h2" size="md" fontWeight="normal" pb={5}>
              Nahled postupu
            </Heading>
            <Box>
              <DirectionsMarkDown
                directions={state.directions}
              ></DirectionsMarkDown>
            </Box>
          </Box>
        </form>
      </Box>
    </formContext.Provider>
  );
};

export default RecipeCreateEditPage;
