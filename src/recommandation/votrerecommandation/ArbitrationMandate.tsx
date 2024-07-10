import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Image, Link } from '@chakra-ui/react';

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

const ArbitrationMandate: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" py={8} px={12} textAlign="left" borderRadius="md" boxShadow="lg" maxW="1000px" mx="auto">
        <HStack spacing={10} alignItems="flex-start">
          <VStack align="start" spacing={4} maxW="600px">
            <Text fontSize="2xl" fontWeight="bold" color="navy">
              Le mandat d’arbitrage
            </Text>
            <Text fontSize="md" color="gray.500">
              Nous vous recommandons <Text as="span" fontWeight="bold" color="navy">la gestion pilotée avec un mandat d'arbitrage</Text> 
              qui vous permet de déléguer la responsabilité de vos choix d’investissement et la réalisation des opérations à des professionnels.
            </Text>
            <Text fontSize="md" color="gray.500">
              Les experts Agavic gèrent alors vos investissements en fonction de votre profil et de votre situation personnelle 
              (horizon de placement, tolérance au risque…).
            </Text>
            <Text fontSize="md" color="gray.500">
              Néanmoins, si vous souhaitez prendre la responsabilité de vos choix d’investissement et réaliser chaque opération, 
              un autre mode de gestion existe, il s’agit de <Text as="span" fontWeight="bold" color="navy">la gestion libre</Text>.
            </Text>
            <Link fontSize="md" color="blue.500" href="#">
              En savoir plus sur nos modes de gestion
            </Link>
          </VStack>
          <Image src="/arosoir.png" alt="Watering Plant" boxSize="300px" objectFit="contain" />
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default ArbitrationMandate;
