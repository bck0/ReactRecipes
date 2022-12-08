import {
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react';

const BasicData = ({ state, handleChange }) => {
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
      <Text>Příloha (search)</Text>
      <Input
        value={state.sideDish}
        name="sideDish"
        type="text"
        onChange={handleChange}
      ></Input>
    </Stack>
  );
};

export default BasicData;
