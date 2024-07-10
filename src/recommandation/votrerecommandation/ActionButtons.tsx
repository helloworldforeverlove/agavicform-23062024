import React from 'react';
import { ChakraProvider, extendTheme, Box, HStack, Button, Icon, Text } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    orange: '#FF8C00',
    yellow: {
      400: '#38A169',
    },
    blue: {
      400: '#3182CE',
    },
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
});

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/informations-personnelles');
  };

  const handleNavigate = (value: number) => {
    navigate(value);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box py={4} px={8} textAlign="left" borderRadius="md" maxW="1000px" mx="auto" mt={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => handleNavigate(-1)}
            px={6}
            py={6}
            size="lg"
          >
            Retour
          </Button>
          <HStack spacing={4}>
            <Icon as={FaPhone} color="navy" />
            <Text fontSize="lg" color="navy">04 78 34 26 23</Text>
          </HStack>
          <Button
            colorScheme="yellow"
            onClick={handleNext}
            px={6}
            py={6}
            size="lg"
          >
            Valider ce projet
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ActionButtons;
