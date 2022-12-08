import React from 'react';
import { Box } from '@chakra-ui/react';

import AppHeader from '../Header/AppHeader';
import AppFooter from '../Footer/AppFooter';
const AppLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box margin={4}>{children}</Box>
      <AppFooter />
    </>
  );
};
export default AppLayout;
