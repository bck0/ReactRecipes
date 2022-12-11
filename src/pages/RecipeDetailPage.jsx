import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Stack,
  Spacer,
  Link,
  HStack,
  SimpleGrid,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from 'react-router-dom';
import { CustomToast } from '../components/Feedback/CustomToast';
import LoadingSpinner from '../components/Feedback/LoadingSpinner';
import DirectionsMarkDown from '../components/MarkDown/DirectionsMarkDown';
import IngredintDetailList from '../components/RecipeDetail/IngredientDetailList';
import RecipeInfo from '../components/RecipeList/RecipeInfo';
import useDelete from '../hooks/useFetch/useDelete';
import useGet from '../hooks/useFetch/useGet';

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: detail, isLoading, error } = useGet(`/recipes/${slug}`);
  const [lastModified, setLastModified] = useState('');

  console.log(detail.directions);
  useEffect(() => {
    if (detail.lastModifiedDate) {
      const date = new Date(detail.lastModifiedDate);
      setLastModified(
        date.toLocaleString('cs', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }),
      );
    }
  }, [detail.lastModifiedDate]);

  const { onDelete, responseDlt, isLoadingDlt, errorDlt } = useDelete(
    `/recipes/${detail._id}`,
  );

  const handleDelete = () => {
    onDelete();
  };

  const { addToast } = CustomToast();

  useEffect(() => {
    if (errorDlt !== '') {
      addToast({ message: errorDlt.response.data.message, type: 'error' });
    }
    if (responseDlt && !isLoadingDlt) {
      addToast({
        message: 'Odstrnanění receptu bylo úspěšné',
        type: 'success',
      });
      navigate('/');
    }
  }, [errorDlt, responseDlt, isLoadingDlt]);

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
          <Stack my={4} direction={{ base: 'column', md: 'column', lg: 'row' }}>
            <Heading>{detail.title}</Heading>
            <Spacer />
            <Box textAlign="right">
              <Link
                as={ReactRouterLink}
                to={`/recept/${slug}/edit`}
                state={{ detail: { detail } }}
              >
                <Button mr={2}>Edit</Button>
              </Link>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Stack>

          <Stack
            direction={{ base: 'column', md: 'column', lg: 'row' }}
            justify={{ lg: 'space-between' }}
            mt={10}
          >
            <Box width="100%">
              <RecipeInfo
                preparationTime={detail.preparationTime}
                sideDish={detail.sideDish}
              />

              <Flex align="center" maxW={{ lg: '30vw' }} mt={4}>
                {detail.ingredients && detail.ingredients.length !== 0 ? (
                  <IngredintDetailList ingredients={detail.ingredients} />
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    Žádné ingredience.
                  </Alert>
                )}
              </Flex>
              <Text>{lastModified}</Text>
            </Box>
            {detail.directions ? (
              <Box maxW="70vw" textAlign="justify">
                <DirectionsMarkDown
                  directions={detail.directions}
                ></DirectionsMarkDown>
              </Box>
            ) : (
              <Alert status="info">
                <AlertIcon />
                Žádný postup.
              </Alert>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default RecipeDetailPage;
