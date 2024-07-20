import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  SimpleGrid,
  Switch,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';

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
  components: {
    Button: {
      baseStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
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

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { updateResponse, getResponse } = useUuid();

  useEffect(() => {
    const fetchResponse = async () => {
      const [personality, investmentHorizon, investmentAmount, incomeStability, trackingFrequency, retainInvestment] = await Promise.all([
        getResponse(91),
        getResponse(92),
        getResponse(93),
        getResponse(94),
        getResponse(95),
        getResponse(96)
      ]);

      setSelectedOptions({
        personality: personality || '',
        investmentHorizon: investmentHorizon || '',
        investmentAmount: investmentAmount || '',
        incomeStability: incomeStability || '',
        trackingFrequency: trackingFrequency || '',
        retainInvestment: retainInvestment === 'true' || retainInvestment === true,
      });
      setLoading(false);
    };

    fetchResponse();
  }, [getResponse]);

  const handleOptionChange = async (category: string, value: string) => {
    const categoryKey = category.replace('step', '') as keyof typeof selectedOptions;
    setSelectedOptions(prev => ({ ...prev, [categoryKey]: value }));
    await updateResponse(parseInt(category.replace('step', '')), value);
  };

  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setSelectedOptions(prev => ({ ...prev, retainInvestment: newValue }));
    await updateResponse(96, newValue.toString());
  };

  const handleNext = async () => {
    const { personality, investmentHorizon, investmentAmount, incomeStability, trackingFrequency, retainInvestment } = selectedOptions;

    if (personality && investmentHorizon && investmentAmount && incomeStability && trackingFrequency) {
      await Promise.all([
        updateResponse(91, personality),
        updateResponse(92, investmentHorizon),
        updateResponse(93, investmentAmount),
        updateResponse(94, incomeStability),
        updateResponse(95, trackingFrequency),
        updateResponse(96, retainInvestment.toString())
      ]);
      navigate('/next-step'); // Replace with the actual next step route
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous step
  };

  const onClose = () => setIsAlertOpen(false);

  const options = {
    personality: [
      { value: 'cigale', label: 'Cigale' },
      { value: 'fourmi', label: 'Fourmi' },
      { value: 'depends', label: 'Cela dépend des jours !' },
    ],
    investmentHorizon: [
      { value: 'unknown', label: 'Je ne sais pas' },
      { value: 'medium', label: 'Moyen terme' },
      { value: 'long', label: 'Long terme' },
    ],
    investmentAmount: [
      { value: 'negative', label: '-10% de mon épargne' },
      { value: 'medium', label: '10 à 30% de mon épargne' },
      { value: 'high', label: '+ 30% de mon épargne' },
    ],
    incomeStability: [
      { value: 'increase', label: 'Vont augmenter régulièrement avec le temps' },
      { value: 'stable', label: 'Devraient rester à peu près stables' },
      { value: 'decrease', label: 'Pourraient baisser ou être instables' },
      { value: 'unknown', label: 'Je ne sais pas' },
    ],
    trackingFrequency: [
      { value: 'daily', label: 'Tous les jours' },
      { value: 'weekly', label: 'Hebdomadaire' },
      { value: 'monthly', label: 'Mensuelle' },
      { value: 'quarterly', label: 'Trimestrielle' },
    ]
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Mon profil investisseur personnalisé
        </Heading>
        <VStack spacing={4} align="stretch">
          {Object.entries(options).map(([key, opts]) => (
            <FormControl key={key}>
              <FormLabel>{key === 'personality' ? 'Je me considère plutôt *' : `Mon ${key} *`}</FormLabel>
              <SimpleGrid columns={[1, 1, 3]} spacing={4}>
                {opts.map((option: Option) => (
                  <Button
                    key={option.value}
                    variant={selectedOptions[key as keyof typeof selectedOptions] === option.value ? 'solid' : 'outline'}
                    colorScheme={selectedOptions[key as keyof typeof selectedOptions] === option.value ? 'blue' : 'gray'}
                    onClick={() => handleOptionChange(`step${key}`, option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </SimpleGrid>
            </FormControl>
          ))}
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel>En cas de dépense imprévue, je conserve mon placement</FormLabel>
            <Switch isChecked={selectedOptions.retainInvestment} onChange={handleSwitchChange} />
          </FormControl>
          <Box display="flex" justifyContent="space-between">
            <Button colorScheme="gray" variant="outline" onClick={handleBack} px={6} py={6} size="lg">
              Retour
            </Button>
            <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>
              Suivant
            </Button>
          </Box>
        </VStack>

        <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                <WarningIcon color="orange" mr={2} />
                Sélection requise
              </AlertDialogHeader>
              <AlertDialogBody>
                Veuillez sélectionner une option avant de continuer. 😊
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </ChakraProvider>
  );
};

export default InvestorProfileCustom;
