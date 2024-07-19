import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Switch,
  extendTheme,
  ChakraProvider,
  SimpleGrid,
} from '@chakra-ui/react';

interface Option {
  value: string;
  label: string;
}

const theme = extendTheme({
  colors: {
    blue: {
      500: '#3182CE',
    },
    gray: {
      200: '#EDF2F7',
      500: '#718096',
    },
  },
});

const InvestorProfileCustom: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    personality: '',
    investmentHorizon: '',
    investmentAmount: '',
    incomeStability: '',
    trackingFrequency: '',
    retainInvestment: false,
  });

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions({ ...selectedOptions, [category]: value });
  };

  const handleSwitchChange = () => {
    setSelectedOptions({ ...selectedOptions, retainInvestment: !selectedOptions.retainInvestment });
  };

  const personalityOptions: Option[] = [
    { value: 'cigale', label: 'Cigale' },
    { value: 'fourmi', label: 'Fourmi' },
    { value: 'depends', label: 'Cela dépend des jours !' },
  ];

  const horizonOptions: Option[] = [
    { value: 'unknown', label: 'Je ne sais pas' },
    { value: 'medium', label: 'Moyen terme' },
    { value: 'long', label: 'Long terme' },
  ];

  const investmentAmountOptions: Option[] = [
    { value: 'negative', label: '-10% de mon épargne' },
    { value: 'medium', label: '10 à 30% de mon épargne' },
    { value: 'high', label: '+ 30% de mon épargne' },
  ];

  const incomeStabilityOptions: Option[] = [
    { value: 'increase', label: 'Vont augmenter régulièrement avec le temps' },
    { value: 'stable', label: 'Devraient rester à peu près stables' },
    { value: 'decrease', label: 'Pourraient baisser ou être instables' },
    { value: 'unknown', label: 'Je ne sais pas' },
  ];

  const trackingFrequencyOptions: Option[] = [
    { value: 'daily', label: 'Tous les jours' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuelle' },
    { value: 'quarterly', label: 'Trimestrielle' },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Mon profil investisseur personnalisé
        </Heading>
        <VStack spacing={4} align="stretch">
          <SimpleGrid columns={[1, 1, 3]} spacing={4}>
            {personalityOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedOptions.personality === option.value ? 'solid' : 'outline'}
                colorScheme={selectedOptions.personality === option.value ? 'blue' : 'gray'}
                onClick={() => handleOptionChange('personality', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={[1, 1, 3]} spacing={4}>
            {horizonOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedOptions.investmentHorizon === option.value ? 'solid' : 'outline'}
                colorScheme={selectedOptions.investmentHorizon === option.value ? 'blue' : 'gray'}
                onClick={() => handleOptionChange('investmentHorizon', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={[1, 1, 3]} spacing={4}>
            {investmentAmountOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedOptions.investmentAmount === option.value ? 'solid' : 'outline'}
                colorScheme={selectedOptions.investmentAmount === option.value ? 'blue' : 'gray'}
                onClick={() => handleOptionChange('investmentAmount', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          <HStack spacing={4} justifyContent="space-between">
            <Text>En cas de dépense imprévue, je conserve mon placement</Text>
            <Switch isChecked={selectedOptions.retainInvestment} onChange={handleSwitchChange} />
          </HStack>
          <SimpleGrid columns={[1, 1, 3]} spacing={4}>
            {incomeStabilityOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedOptions.incomeStability === option.value ? 'solid' : 'outline'}
                colorScheme={selectedOptions.incomeStability === option.value ? 'blue' : 'gray'}
                onClick={() => handleOptionChange('incomeStability', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={[1, 1, 3]} spacing={4}>
            {trackingFrequencyOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedOptions.trackingFrequency === option.value ? 'solid' : 'outline'}
                colorScheme={selectedOptions.trackingFrequency === option.value ? 'blue' : 'gray'}
                onClick={() => handleOptionChange('trackingFrequency', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default InvestorProfileCustom;
