import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, ListItem, SimpleGrid } from '@chakra-ui/react';

const IngredientsItem = ({ provided, ingredients, handleDelete, index }) => {
  const { amount, amountUnit, name, isGroup } = ingredients;
  return (
    <ListItem
      borderTop="1px"
      borderTopColor="lightgrey"
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      {isGroup ? (
        <SimpleGrid columns={3} p={2} backgroundColor="lightgrey">
          <Flex align="center">
            <DeleteIcon onClick={() => handleDelete(index)} />
          </Flex>
          <Flex justify="center" fontWeight="bold">
            {name}
          </Flex>
          <Flex justify="end" align="center" {...provided.dragHandleProps}>
            <HamburgerIcon />
          </Flex>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={5} p={2}>
          <Flex align="center">
            <DeleteIcon onClick={() => handleDelete(index)} />
          </Flex>
          <Box>{amount}</Box>
          <Box>{amountUnit}</Box>
          <Box>{name}</Box>
          <Flex justify="end" align="center" {...provided.dragHandleProps}>
            <HamburgerIcon />
          </Flex>
        </SimpleGrid>
      )}
    </ListItem>
  );
};

export default IngredientsItem;
