import {
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { formContext } from './formReducer';
import InputSearch from './InputSearch';

const BasicData = () => {
  const { state, dispatch, handleChange } = useContext(formContext);
  return (
    <Stack w={{ lg: '25vw' }}>
      <Heading as="h2" size="md" fontWeight="normal">
        Základní údaje
      </Heading>
      <Text>Doba přípravy</Text>
      <InputGroup>
        <Input
          type="number"
          min="0"
          value={state.preparationTime}
          name="preparationTime"
          onChange={handleChange}
        ></Input>
        <InputRightAddon children="min" />
      </InputGroup>

      <Text>Počet porcí</Text>
      <Input
        type="number"
        min="1"
        value={state.servingCount}
        name="servingCount"
        onChange={handleChange}
      ></Input>
      <Text>Příloha</Text>
      <InputSearch
        value={state.sideDish}
        name={'sideDish'}
        placeholder={''}
        url={'/recipes/side-dishes'}
        dispatch={dispatch}
      />
    </Stack>
  );
};

export default BasicData;
