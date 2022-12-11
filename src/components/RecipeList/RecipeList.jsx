import { SimpleGrid } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    // <Box display="flex" gap={10} flexWrap="wrap">
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}>
      {recipes.length !== 0 &&
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            slug={recipe.slug}
            sideDish={recipe.sideDish}
          />
        ))}
    </SimpleGrid>
  );
};

export default RecipeList;
