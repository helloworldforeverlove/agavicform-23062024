import React from 'react';
import { Box, Text, Button, Flex, Image, extendTheme, ChakraProvider, Center } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    navy: '#004aad',
    white: '#FFFFFF',
  },
});

const Header: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#004aad" paddingY="2" paddingX="4">
        <Center>
          <Flex width="full" maxWidth="1200px" align="center" justify="space-between">
            <Flex align="center">
              {/* Logo Section */}
              <Image src="/agaviclogo.png" alt="Logo" height="30px" />
              
              {/* Text Section */}
              <Text color="white" fontSize="lg" ml="2">
                AGAVIC
              </Text>
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
