import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  Link,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { supabase } from './../../supabaseClient'; 
import { useUuid } from './../../context/UuidContext'; 

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

const YourProject: React.FC = () => {
  const [initialPayment, setInitialPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState('');
  const { uuid } = useUuid();

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select('step2, step3, step4')
        .eq('id', uuid)
        .single();

      if (error) {
        console.error('Error fetching project data:', error);
      } else {
        setInitialPayment(data?.step2 || '');
        setMonthlyPayment(data?.step3 || '');
        setInvestmentHorizon(data?.step4 || '');
      }
    };

    fetchProjectData();
  }, [uuid]);

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="600px" mx="auto" bg="white" borderRadius="md" boxShadow="sm">
        <HStack justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.700">
            Votre projet
          </Text>
          <Link fontSize="sm" fontWeight="bold" color="blue.700" href="#">
            Modifier
          </Link>
        </HStack>
        <HStack spacing={10} justify="space-between">
          <VStack align="flex-start">
            <Text fontSize="sm" color="gray.700">
              Versement initial
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.700">
              {initialPayment} €
            </Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontSize="sm" color="gray.700">
              Versement mensuel
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.700">
              {monthlyPayment} € <Box as="span" fontSize="md" color="gray.700">/ mois</Box>
            </Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontSize="sm" color="gray.700">
              Horizon de placement
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.700">
              {investmentHorizon} ans
            </Text>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default YourProject;
