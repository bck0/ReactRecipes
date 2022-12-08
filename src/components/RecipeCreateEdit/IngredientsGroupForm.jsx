import { Button, HStack, Input, Text } from '@chakra-ui/react';

const IngredientsGroupForm = ({ groupName, setGroupName, handleAddGroup }) => {
  return (
    <>
      <Text>Přidat skupinu</Text>
      <HStack>
        <Input
          placeholder="Nová skupina"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        ></Input>
        <Button onClick={handleAddGroup}>+ Přidat</Button>
      </HStack>
    </>
  );
};

export default IngredientsGroupForm;
