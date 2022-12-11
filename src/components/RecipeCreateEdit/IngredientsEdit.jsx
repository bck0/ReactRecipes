import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { formContext } from './formReducer';
import IngredientsForm from './IngredientsFrom';
import IngredientsGroupForm from './IngredientsGroupForm';
import IngredientsList from './IngredientsList';

const IngredientsEdit = () => {
  const { state } = useContext(formContext);
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
        <IngredientsList />
      )}
      <IngredientsForm />
      <IngredientsGroupForm />
    </VStack>
  );
};

export default IngredientsEdit;
