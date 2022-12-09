import { Button, HStack, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const IngredientsGroupForm = ({ dispatch }) => {
  const [groupName, setGroupName] = useState('');

  //pridani skupiny do formReduceru
  const handleAddGroup = () => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: { name: groupName, isGroup: true },
    });
    setGroupName('');
  };
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
