import { HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiKnifeFork } from 'react-icons/gi';

const RecipeInfo = ({ preparationTime, sideDish }) => {
  const [convertedPrepTime, setConvertedPrepTime] = useState();
  useEffect(() => {
    if (preparationTime) {
      let hours = Math.floor(preparationTime / 60);

      if (hours === 0) {
        hours = '';
      } else {
        hours = `${hours}h`;
      }

      let remainMinutes = preparationTime % 60;
      if (remainMinutes === 0) {
        remainMinutes = '';
      } else {
        remainMinutes = `${remainMinutes}min`;
      }

      setConvertedPrepTime(`${hours} ${remainMinutes}`);
    }
  }, [preparationTime]);

  return (
    <HStack>
      {preparationTime && (
        <>
          <AiOutlineClockCircle />
          <Text>{convertedPrepTime}</Text>
        </>
      )}
      {sideDish && (
        <>
          <GiKnifeFork />
          <Text>{sideDish}</Text>
        </>
      )}
    </HStack>
  );
};

export default RecipeInfo;
