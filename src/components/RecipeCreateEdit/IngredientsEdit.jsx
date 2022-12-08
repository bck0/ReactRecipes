import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import IngredientsForm from './IngredientsFrom';
import IngredientsGroupForm from './IngredientsGroupForm';
import IngredientsList from './IngredientsList';

const IngredientsEdit = ({
  state,
  stateIngredient,
  dispatch,
  handleIngredient,
  handlePushToList,
  setGroupName,
  groupName,
  handleAddGroup,
}) => {
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
      <IngredientsForm
        stateIngredient={stateIngredient}
        handleIngredient={handleIngredient}
        handlePushToList={handlePushToList}
      />
      <IngredientsGroupForm
        groupName={groupName}
        setGroupName={setGroupName}
        handleAddGroup={handleAddGroup}
      />
    </VStack>
  );
};

export default IngredientsEdit;
