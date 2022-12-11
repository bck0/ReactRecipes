import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Spacer,
  Text,
  Link,
} from '@chakra-ui/react';
import LoadingSpinner from '../components/Feedback/LoadingSpinner';
import RecipeList from '../components/RecipeList/RecipeList';
import useGet from '../hooks/useFetch/useGet.js';
import { Link as ReactRouterLink } from 'react-router-dom';

const RecipeListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: recipes, isLoading, error } = useGet('/recipes');

  function handleInputValueChange(e) {
    setSearchValue(e.currentTarget.value);
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const normalized = searchValue
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const normalizedTitle = recipe.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return normalizedTitle.includes(normalized);
  });

  return (
    <Box px={5}>
      <HStack my={4}>
        <HStack align="end">
          <Heading color="dodgerblue">Recepty</Heading>
          <Text> {recipes.length}</Text>
        </HStack>
        <Spacer />
        <Link as={ReactRouterLink} to="/novy-recept">
          <Button>Add</Button>
        </Link>
      </HStack>

      <Input
        placeholder="Search"
        value={searchValue}
        onChange={handleInputValueChange}
        mb={10}
      />

      {isLoading && <LoadingSpinner />}
      {error && <Text>{error}</Text>}
      <RecipeList recipes={filteredRecipes} />
    </Box>
  );
};
export default RecipeListPage;
