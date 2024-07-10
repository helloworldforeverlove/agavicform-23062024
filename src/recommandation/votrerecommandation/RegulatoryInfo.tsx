import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Link, Avatar } from '@chakra-ui/react';

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

const RegulatoryInfo: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" py={8} px={12} textAlign="left" borderRadius="md" boxShadow="lg" maxW="1000px" mx="auto">
        <Text fontSize="xl" fontWeight="bold" color="navy" mb={6}>
          Toute l’information réglementaire
        </Text>
        <HStack spacing={10} alignItems="flex-start" mb={6}>
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" color="navy">Sur notre mandat de gestion :</Text>
            <Link href="#" color="blue.500">Lire le mandat d'arbitrage pour l'Assurance-vie</Link>
            <Text fontWeight="bold" color="navy" mt={4}>Sur votre enveloppe fiscale et la signature du contrat :</Text>
            <Link href="#" color="blue.500">Lire la notice du contrat d'Assurance-vie Agavic Vie</Link>
            <Link href="#" color="blue.500">Lire le document d’informations clés du contrat Agavic Vie</Link>
            <Link href="#" color="blue.500">Lire les conditions générales d'accès à la signature électronique</Link>
          </VStack>
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" color="navy">Sur nos tarifs :</Text>
            <Link href="#" color="blue.500">En savoir plus sur les tarifs Agavic</Link>
            <Text fontWeight="bold" color="navy" mt={4}>Sur les risques de vos placements :</Text>
            <Link href="#" color="blue.500">En savoir plus sur les risques financiers</Link>
            <Link href="#" color="blue.500">En savoir plus sur les informations relatives aux réclamations et à la médiation</Link>
          </VStack>
          <VStack align="start" spacing={3} bg="gray.100" p={4} borderRadius="md">
            <Text fontStyle="italic" color="gray.700">
              "Afin de favoriser la <Text as="span" fontWeight="bold" color="navy">transparence</Text> et vous protéger, nous mettons à votre disposition l’ensemble des informations sur les contrats et les frais, et nous sommes à votre écoute en cas de questions."
            </Text>
            <HStack alignItems="center" spacing={2}>
              <Avatar name="Thomas" src="/path/to/avatar.jpg" size="sm" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" color="navy">Le mot de Thomas</Text>
                <Text fontSize="sm" color="gray.600">Responsable conformité chez Agavic</Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default RegulatoryInfo;
