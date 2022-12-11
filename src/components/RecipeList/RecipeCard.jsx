import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../../images/food-placeholder.png';
import RecipeInfo from './RecipeInfo';

const RecipeCard = ({ slug, title, preparationTime, sideDish }) => {
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
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
