import { Box, Heading, Text, List, ListItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Feedback/LoadingSpinner';
import useGet from '../hooks/useFetch/useGet';

const RecipeDetailPage = () => {
  const { slug } = useParams();

  const { data: detail, isLoading, error } = useGet(`/recipes/${slug}`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      {detail && (
        <Box px={5}>
          <Heading>{detail.title}</Heading>
          <Box display="flex" justifyContent="space-between" mt={10}>
            <Box>
              <Text mb={2}>{detail.preparationTime} min</Text>
              {detail.ingredients && (
                <List mb={2}>
                  {detail.ingredients.map((ingredient) => (
                    <ListItem
                      key={ingredient._id}
                    >{`${ingredient.amount} ${ingredient.amountUnit}   ${ingredient.name}`}</ListItem>
                  ))}
                </List>
              )}
              <Text>{detail.lastModifiedDate}</Text>
            </Box>
            {detail.directions && <Text ml={20}>{detail.directions}</Text>}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RecipeDetailPage;
