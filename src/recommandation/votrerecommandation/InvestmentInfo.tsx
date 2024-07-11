import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, HStack, VStack, Image, Icon } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';

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

const InvestmentInfo: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" py={8} px={12} textAlign="left" borderRadius="md" boxShadow="lg" mx="auto">
        <HStack spacing={5} alignItems="center" mb={6}>
          <Image src="/cochonbleu.jpg" alt="Suravenir" boxSize="80px" borderRadius="full" />
          <VStack align="start">
            <Text fontSize="2xl" fontWeight="bold" color="navy">
              Votre investissement sera hébergé dans une assurance-vie
            </Text>
            <Text fontSize="md" color="gray.500">
              Nous vous proposons d’investir au sein de <Text as="span" fontWeight="bold" color="navy">PatriLife Vie</Text>,
              un contrat d’assurance-vie de groupe de type multisupport géré par notre partenaire Suravenir.
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={2} bg="gray.100" p={4} borderRadius="md">
          <Icon as={FaLock} color="navy" />
          <Text fontSize="sm" color="gray.600">
            Votre argent est conservé chez notre assureur Suravenir, filiale du Crédit Mutuel Arkéa.
          </Text>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default InvestmentInfo;
