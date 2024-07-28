// src/components/Header.tsx
import React from 'react';
import { Box, Button, Flex, Image, extendTheme, ChakraProvider, Center } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    navy: '#004aad',
    white: '#FFFFFF',
  },
});

const Header: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <ChakraProvider theme={theme}>
    <Box bg="#004aad" paddingY="2" paddingX="4">
      <Center>
        <Flex width="full" maxWidth="1200px" align="center" justify="space-between">
          <Flex align="center">
            {/* Logo Section */}
            <Image src="/epargneplus.png" alt="Logo" height="30px" />
              
          </Flex>

          {/* Button Section */}
          <Button
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{ bg: 'white', color: 'navy' }}
            borderRadius="8px"
            paddingX="6"
            paddingY="4"
            onClick={openModal}
          >
            Une question ?
          </Button>
        </Flex>
      </Center>
    </Box>
    </ChakraProvider>
  );
};

export default Header;
