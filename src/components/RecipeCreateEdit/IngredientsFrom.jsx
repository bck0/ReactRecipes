import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useReducer } from 'react';
import {
  ingredientReducer,
  INITIAL_STATE_INGREDIENT,
} from './ingredientReducer';

const IngredientsForm = ({ dispatch }) => {
  //ingredient reducer
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

  //pridani ingredience do formReduceru
  const handlePushToList = () => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: stateIngredient,
    });
    //Vrati UseReducer state pro jedenu ingredienci do puvodniho stavu
    ingredientDispatch({ type: 'RESET', payload: INITIAL_STATE_INGREDIENT });
  };

  return (
    <>
      <Text>Přídat ingredienci</Text>
      <VStack align="stretch">
        <HStack>
          <Input
            value={stateIngredient.amount}
            name="amount"
            type="number"
            onChange={handleIngredient}
          ></Input>

          <Input
            placeholder="Jednotka"
            type="text"
            value={stateIngredient.amountUnit}
            name="amountUnit"
            onChange={handleIngredient}
          ></Input>
        </HStack>
        <HStack>
          <Input
            placeholder="Název"
            type="text"
            value={stateIngredient.name}
            name="name"
            onChange={handleIngredient}
          ></Input>
          <Button onClick={handlePushToList}>+ Přidat</Button>
        </HStack>
      </VStack>
    </>
  );
};

export default IngredientsForm;
