import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';

const IngredientsForm = ({
  stateIngredient,
  handleIngredient,
  handlePushToList,
}) => {
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
