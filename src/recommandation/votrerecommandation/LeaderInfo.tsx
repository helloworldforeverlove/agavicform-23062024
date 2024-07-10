import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Divider, Icon } from '@chakra-ui/react';
import { FcAbout, FcAcceptDatabase, FcAddImage, FcApproval, FcAssistant, FcConferenceCall } from 'react-icons/fc';

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

const LeaderInfo: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" py={10} px={5} textAlign="center">
        <Text fontSize="lg" fontWeight="bold" mb={5} color="gray.500">
          Le leader français de la gestion d’épargne en ligne
        </Text>
        <HStack spacing={10} justifyContent="center" mb={10}>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="blue.700">+ de 60 000</Text>
            <Text fontSize="sm" color="gray.500">contrats signés depuis 2015</Text>
          </VStack>
          <Divider orientation="vertical" height="50px" />
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="blue.700">2 signatures</Text>
            <Text fontSize="sm" color="gray.500">toutes les heures en 2023</Text>
          </VStack>
          <Divider orientation="vertical" height="50px" />
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="blue.700">13</Text>
            <Text fontSize="sm" color="gray.500">prix et récompenses en 2023</Text>
          </VStack>
        </HStack>
        <HStack spacing={5} justifyContent="center">
          <Icon as={FcAbout} boxSize="60px" />
          <Icon as={FcAcceptDatabase} boxSize="60px" />
          <Icon as={FcAddImage} boxSize="60px" />
          <Icon as={FcApproval} boxSize="60px" />
          <Icon as={FcAssistant} boxSize="60px" />
          <Icon as={FcConferenceCall} boxSize="60px" />
        </HStack>
        <Text fontSize="sm" mt={5} color="gray.500">
          Ces prix sont décernés selon leurs propres critères. Ils sont validés un an après leur date d'attribution.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default LeaderInfo;
