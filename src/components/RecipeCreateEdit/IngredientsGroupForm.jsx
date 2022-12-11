import { Button, HStack, Input, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { formContext } from './formReducer';

const IngredientsGroupForm = () => {
  const { dispatch } = useContext(formContext);

  const [groupName, setGroupName] = useState('');

  //pridani skupiny do formReduceru
  const handleAddGroup = () => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: { name: groupName, amount: 0, amountUnit: '', isGroup: true },
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
          autoComplete="off"
          onChange={(e) => setGroupName(e.target.value)}
        ></Input>
        <Button onClick={handleAddGroup}>+ Přidat</Button>
      </HStack>
    </>
  );
};

export default IngredientsGroupForm;
