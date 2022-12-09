import {
  Box,
  Button,
  Flex,
  FormControl,
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
  TEST_DATA,
} from '../components/RecipeCreateEdit/formReducer';
import { ingredientReducer } from '../components/RecipeCreateEdit/ingredientReducer';
import { INITIAL_STATE_INGREDIENT } from '../components/RecipeCreateEdit/ingredientReducer';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import usePost from '../hooks/useFetch/usePost.js';
import BasicData from '../components/RecipeCreateEdit/BasicData';
import IngredientsEdit from '../components/RecipeCreateEdit/IngredientsEdit';
import { CustomToast } from '../components/Feedback/CustomToast';

const RecipeAddPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');
  //in edit, put data here

  // *** formReducer ***
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  //pridani dat z formualre do formReduceru
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  //pridani ingredience z ingredientReducer do formReduceru
  const handlePushIngredient = (ingredient) => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: ingredient,
    });
  };

  //middle area
  const [groupName, setGroupName] = useState();

  //pridani skupiny rovnou do formReduceru
  const handleAddGroup = () => {
    handlePushIngredient({ name: groupName, isGroup: true });
    setGroupName('');
  };

  //pridani ingredience rovnou do formReduceru
  const handlePushToList = () => {
    handlePushIngredient(stateIngredient);
    //Vrati UseReducer state pro jedenu ingredienci do puvodniho stavu
    ingredientDispatch({ type: 'RESET', payload: INITIAL_STATE_INGREDIENT });
  };

  //*** ingredient reducer ***
  const [stateIngredient, ingredientDispatch] = useReducer(
    ingredientReducer,
    INITIAL_STATE_INGREDIENT,
  );

  //handlovani inputu do ingredientReduceru
  const handleIngredient = (e) => {
    ingredientDispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  //test
  const { onSubmit, response, isLoading, error } = usePost(`/recipes`, state);

  const { addToast } = CustomToast();
  useEffect(() => {
    if (error !== '') {
      addToast({ message: error.response.data.message, type: 'error' });
    }
    if (response && !isLoading) {
      addToast({ message: 'uspesny', type: 'success' });
      navigate(`/recept/${state.slug}`);
    }
  }, [error, response, isLoading]);

  const onSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SLUG' });
    onSubmit();
  };

  return (
    <Box px={5}>
      <form onSubmit={onSave}>
        <Box>
          <Stack my={4} direction={{ base: 'column', md: 'column', lg: 'row' }}>
            <Heading as="h1">
              {state.title === '' ? 'Nový recept' : state.title}
            </Heading>
            <Spacer />
            <Box textAlign="right">
              <Button type="submit" mr={2} colorScheme="whatsapp">
                Save
              </Button>
              <Button onClick={handleNavigate}>Cancel</Button>
            </Box>
          </Stack>
        </Box>
        <Box mb={5}>
          <FormControl mb={5}>
            <Input
              value={state.title}
              type="text"
              name="title"
              placeholder="Název"
              onChange={handleChange}
            />
          </FormControl>
          {/* form-start */}
          <Stack direction={{ base: 'column', md: 'column', lg: 'row' }}>
            {/* LEFT */}
            <BasicData state={state} handleChange={handleChange} />
            {/* middle */}
            <IngredientsEdit
              state={state}
              stateIngredient={stateIngredient}
              dispatch={dispatch}
              handleIngredient={handleIngredient}
              handlePushToList={handlePushToList}
              setGroupName={setGroupName}
              groupName={groupName}
              handleAddGroup={handleAddGroup}
            />
            {/* right  */}
            <Flex direction="column" h="40vh" w={{ md: '50vw', xl: '70vw' }}>
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
            <ReactMarkdown>{state.directions}</ReactMarkdown>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RecipeAddPage;
