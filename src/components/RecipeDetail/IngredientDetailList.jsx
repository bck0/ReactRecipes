import { Flex, List, ListItem, SimpleGrid } from '@chakra-ui/react';

const IngredintDetailList = ({ ingredients }) => {
  return (
    <List mb={2} width="100%">
      {ingredients.map((ingredient) =>
        ingredient.isGroup ? (
          <ListItem key={ingredient._id} mb={2}>
            <Flex
              justify="center"
              backgroundColor="lightgray"
            >{`${ingredient.name}`}</Flex>
          </ListItem>
        ) : (
          <ListItem
            key={ingredient._id}
            borderBottom="1px"
            borderBottomColor="lightgrey"
            mb={2}
          >
            <SimpleGrid columns={3}>
              <Flex w="80%" justify="end">
                {ingredient.amount}
              </Flex>
              <Flex w="10%" justify="start">
                {ingredient.amountUnit}
              </Flex>
              <Flex justify="start">{ingredient.name} </Flex>
            </SimpleGrid>
          </ListItem>
        ),
      )}
    </List>
  );
};

export default IngredintDetailList;
