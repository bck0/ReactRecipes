import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import {
  ingredientReducer,
  INITIAL_STATE_INGREDIENT,
} from './ingredientReducer';
import IngredientsForm from './IngredientsFrom';
import IngredientsGroupForm from './IngredientsGroupForm';
import IngredientsList from './IngredientsList';

const IngredientsEdit = ({ state, dispatch }) => {
  //middle area
  //pridani ingredience z ingredientReducer do formReduceru
  // const handlePushIngredient = (ingredient) => {
  //   dispatch({
  //     type: 'ADD_INGREDIENT',
  //     payload: ingredient,
  //   });
  // };

  return (
    <VStack align="stretch" w={{ lg: '30vw' }}>
      <Heading as="h2" size="md" fontWeight="normal">
        Ingredience
      </Heading>
      {state.ingredients.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          Zatím žádné ingredience.
        </Alert>
      ) : (
        <IngredientsList
          ingredients={state.ingredients}
          dispatch={dispatch}
        ></IngredientsList>
      )}
      <IngredientsForm dispatch={dispatch} />
      <IngredientsGroupForm dispatch={dispatch} />
    </VStack>
  );
};

export default IngredientsEdit;
