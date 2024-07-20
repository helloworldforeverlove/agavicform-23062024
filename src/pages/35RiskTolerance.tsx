import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  SimpleGrid,
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

const RiskTolerance: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    step107: '',
    step108: '',
    step109: '',
    step110: '',
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { updateResponse, getResponse } = useUuid();

  useEffect(() => {
    const fetchResponse = async () => {
      const [step107, step108, step109, step110] = await Promise.all([
        getResponse(107),
        getResponse(108),
        getResponse(109),
        getResponse(110),
      ]);

      setSelectedOptions({
        step107: step107 || '',
        step108: step108 || '',
        step109: step109 || '',
        step110: step110 || '',
      });
      setLoading(false);
    };

    fetchResponse();
  }, [getResponse]);

  const handleOptionChange = async (category: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [category]: value }));
    await updateResponse(parseInt(category.replace('step', '')), value);
  };

  const handleNext = async () => {
    if (Object.values(selectedOptions).every(option => option)) {
      await Promise.all(
        Object.entries(selectedOptions).map(([key, value]) =>
          updateResponse(parseInt(key.replace('step', '')), value)
        )
      );
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
    step107: [
      { value: '0.5-2', label: '0.5% et 2%/an' },
      { value: '2-5', label: '2% et 5%/an' },
      { value: '5+', label: '>5%/an' },
    ],
    step108: [
      { value: 'low', label: 'Faible' },
      { value: 'medium', label: 'Moyenne' },
      { value: 'high', label: 'Importante' },
    ],
    step109: [
      { value: 'secure', label: 'Sécuriser' },
      { value: 'wait', label: 'Patienter' },
      { value: 'reinvest', label: 'Réinvestir' },
    ],
    step110: [
      { value: '5', label: '-5%' },
      { value: '10', label: '-10%' },
      { value: '20', label: '-20%' },
      { value: 'confident', label: 'Je reste confiant sur un retour positif du marché' },
    ],
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Tolérance aux risques
        </Heading>
        <VStack spacing={4} align="stretch">
          {Object.entries(options).map(([key, opts]) => (
            <FormControl key={key}>
              <FormLabel>
                {key === 'step107'
                  ? "J'établis mon objectif de rendement annuel entre *"
                  : key === 'step108'
                  ? 'Ma tolérance aux risques de perte est *'
                  : key === 'step109'
                  ? 'En cas de moins-value latentes, je préfère *'
                  : 'Vous commencez à stresser fortement lors d\'une moins-value latente de : *'}
              </FormLabel>
              <SimpleGrid columns={[1, 1, 3]} spacing={4}>
                {opts.map((option: Option) => (
                  <Button
                    key={option.value}
                    variant={selectedOptions[key as keyof typeof selectedOptions] === option.value ? 'solid' : 'outline'}
                    colorScheme={selectedOptions[key as keyof typeof selectedOptions] === option.value ? 'blue' : 'gray'}
                    onClick={() => handleOptionChange(key, option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </SimpleGrid>
            </FormControl>
          ))}
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

export default RiskTolerance;
