import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../../images/food-placeholder.png';

const RecipeCard = ({ slug, title, preparationTime }) => {
  return (
    <Link to={`/recept/${slug}`}>
      <Card maxW="100%" h="full">
        <CardBody>
          <Image
            src={PlaceholderImage}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text color="blue.600" fontSize="2xl">
              {preparationTime}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
