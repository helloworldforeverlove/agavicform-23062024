import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Image, Badge } from '@chakra-ui/react';
import { FaGlobeEurope, FaGlobeAmericas, FaGlobeAsia } from 'react-icons/fa';

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

const GeographicDiversification: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5} maxW="1000px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        <Text fontSize="lg" fontWeight="bold" mb={5} color="gray.500">
          Diversification géographique (hors Fonds Euro)
        </Text>
        <HStack spacing={10} alignItems="flex-start">
          <Image src="/worldmap.jpg" alt="Geographical Diversification Map" boxSize="300px" borderRadius="md" boxShadow="md" />
          <VStack align="flex-start" spacing={4} maxW="600px">
            <HStack>
              <FaGlobeEurope color="#3182CE" size="24px" />
              <Text fontWeight="bold" color="blue.700">
                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} mr={2}>
                  87,8%
                </Badge>
                Europe
              </Text>
            </HStack>
            <HStack>
              <FaGlobeAmericas color="#3182CE" size="24px" />
              <Text fontWeight="bold" color="blue.700">
                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} mr={2}>
                  9,7%
                </Badge>
                Amérique nord
              </Text>
            </HStack>
            <HStack>
              <FaGlobeAsia color="#3182CE" size="24px" />
              <Text fontWeight="bold" color="blue.700">
                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} mr={2}>
                  1,6%
                </Badge>
                Asie pacifique
              </Text>
            </HStack>
            <HStack>
              <FaGlobeAsia color="#3182CE" size="24px" />
              <Text fontWeight="bold" color="blue.700">
                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} mr={2}>
                  0,7%
                </Badge>
                Japon
              </Text>
            </HStack>
            <HStack>
              <FaGlobeAmericas color="#3182CE" size="24px" />
              <Text fontWeight="bold" color="blue.700">
                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} mr={2}>
                  0,2%
                </Badge>
                Amérique latine
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default GeographicDiversification;
