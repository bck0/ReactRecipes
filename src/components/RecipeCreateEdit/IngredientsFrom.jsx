import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useContext, useReducer } from 'react';
import { formContext } from './formReducer';
import {
  ingredientReducer,
  INITIAL_STATE_INGREDIENT,
} from './ingredientReducer';
import InputSearch from './InputSearch';

const IngredientsForm = () => {
  const { dispatch } = useContext(formContext);

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
            placeholder="Množství"
            name="amount"
            type="number"
            onChange={handleIngredient}
          ></Input>

          <Input
            placeholder="Jednotka"
            type="text"
            value={stateIngredient.amountUnit}
            name="amountUnit"
            autoComplete="off"
            onChange={handleIngredient}
          ></Input>
        </HStack>
        <HStack>
          <InputSearch
            value={stateIngredient.name}
            name={'name'}
            placeholder={'Název'}
            url={'/recipes/ingredients'}
            dispatch={ingredientDispatch}
          />
          <Button onClick={handlePushToList}>+ Přidat</Button>
        </HStack>
      </VStack>
    </>
  );
};

export default IngredientsForm;
