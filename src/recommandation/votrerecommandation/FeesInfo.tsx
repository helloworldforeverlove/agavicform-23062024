import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Divider, Icon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

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

const FeesInfo: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" py={8} px={12} textAlign="center" borderRadius="md" boxShadow="lg" mx="auto">
        <Text fontSize="xl" fontWeight="bold" color="navy" mb={4}>
          Des frais optimisés
        </Text>
        <Text fontSize="md" color="gray.500" mb={6}>
          Contrairement aux gestionnaires privés qui pratiquent des frais de <Text as="span" fontWeight="bold" color="orange">3,6% en moyenne</Text>, 
          les frais Agavic sont personnalisés en fonction de votre projet. 
          <br />
          <Text fontSize="sm" color="gray.500">*Frais moyens des gérants privés (<a href="https" style={{color: 'blue'}}>étude AMF</a>)</Text>
        </Text>
        <HStack spacing={10} justifyContent="center" mb={6}>
          <VStack spacing={3} align="center">
            <Text fontSize="4xl" fontWeight="bold" color="orange">0,9%</Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.500">max. par an, tout compris</Text>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">0,21% pour la gestion Agavic</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">0,60% pour votre enveloppe d’investissement</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">0,09% de gestion indiciels</Text>
            </HStack>
          </VStack>
          <Divider orientation="vertical" height="100px" />
          <VStack spacing={3} align="center">
            <Text fontSize="4xl" fontWeight="bold" color="blue.500">0 €</Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.500">de frais d’entrée</Text>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">de frais d’entrée</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">de frais de dossier</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">de frais de versements</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="yellow.400" />
              <Text fontSize="md" color="gray.600">de frais d’arbitrages</Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default FeesInfo;
