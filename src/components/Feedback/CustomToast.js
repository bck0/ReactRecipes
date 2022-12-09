import { useToast } from '@chakra-ui/react';

export const CustomToast = () => {
  const toast = useToast();

  const addToast = (newRes) => {
    toast({
      description: newRes.message,
      status: newRes.type,
      position: 'top',
      isClosable: true,
      duration: 5000,
      variant: 'left-accent',
    });
  };

  return { addToast };
};
