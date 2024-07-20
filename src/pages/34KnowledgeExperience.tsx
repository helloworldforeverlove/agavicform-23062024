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

type KnowledgeKeys =
  | 'step97'
  | 'step98'
  | 'step99'
  | 'step100'
  | 'step101'
  | 'step102'
  | 'step103'
  | 'step104'
  | 'step105';

const KnowledgeExperience: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    step106: '',
  });
  const [knowledge, setKnowledge] = useState<Record<KnowledgeKeys, boolean>>({
    step97: false,
    step98: false,
    step99: false,
    step100: false,
    step101: false,
    step102: false,
    step103: false,
    step104: false,
    step105: false,
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { updateResponse, getResponse } = useUuid();

  useEffect(() => {
    const fetchResponse = async () => {
      const [
        step97,
        step98,
        step99,
        step100,
        step101,
        step102,
        step103,
        step104,
        step105,
        step106,
      ] = await Promise.all([
        getResponse(97),
        getResponse(98),
        getResponse(99),
        getResponse(100),
        getResponse(101),
        getResponse(102),
        getResponse(103),
        getResponse(104),
        getResponse(105),
        getResponse(106),
      ]);

      setKnowledge({
        step97: step97 === 'true',
        step98: step98 === 'true',
        step99: step99 === 'true',
        step100: step100 === 'true',
        step101: step101 === 'true',
        step102: step102 === 'true',
        step103: step103 === 'true',
        step104: step104 === 'true',
        step105: step105 === 'true',
      });

      setSelectedOptions({
        step106: step106 || '',
      });

      setLoading(false);
    };

    fetchResponse();
  }, [getResponse]);

  const handleSwitchChange = async (field: KnowledgeKeys) => {
    const newValue = !knowledge[field];
    setKnowledge(prevState => ({
      ...prevState,
      [field]: newValue,
    }));
    await updateResponse(parseInt(field.replace('step', '')), newValue.toString());
  };

  const handleOptionChange = async (category: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [category]: value }));
    await updateResponse(parseInt(category.replace('step', '')), value);
  };

  const handleNext = async () => {
    await Promise.all(
      Object.entries(knowledge).map(([key, value]) =>
        updateResponse(parseInt(key.replace('step', '')), value.toString())
      )
    );
    await updateResponse(106, selectedOptions.step106);
    navigate('/next-step'); // Replace with the actual next step route
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous step
  };

  const onClose = () => setIsAlertOpen(false);

  const steps: { label: string; key: KnowledgeKeys }[] = [
    { label: "Je sais ce qu'est un ETF", key: 'step97' },
    { label: "Je sais ce qu'est une action", key: 'step98' },
    { label: "J'ai déjà souscrit à un contrat d'assurance vie", key: 'step99' },
    { label: "Je sais ce qu'est une obligation", key: 'step100' },
    { label: "Je sais ce qu'est un FIP/FCPR", key: 'step101' },
    { label: "J'ai déjà fait appel à un conseil financier pour m'aider à investir mon argent", key: 'step102' },
    { label: "Connaissez-vous les produits structurés ?", key: 'step103' },
    { label: "Connaissez-vous les fonds immobilier SCPI, OPCI, SCI ... ?", key: 'step104' },
    { label: "Custom Option 1", key: 'step105' },
  ];

  const personalityOptions: Option[] = [
    { value: 'novice', label: 'Novice' },
    { value: 'experienced', label: 'Plutôt expérimenté' },
    { value: 'expert', label: 'Expert' },
  ];

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Connaissance & expérience
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>En tant qu'investisseur, je m'estime *</FormLabel>
            <SimpleGrid columns={[1, 1, 3]} spacing={4}>
              {personalityOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedOptions.step106 === option.value ? 'solid' : 'outline'}
                  colorScheme={selectedOptions.step106 === option.value ? 'blue' : 'gray'}
                  onClick={() => handleOptionChange('step106', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </SimpleGrid>
          </FormControl>
          {steps.map(step => (
            <FormControl key={step.key}>
              <FormLabel>{step.label}</FormLabel>
              <Switch isChecked={knowledge[step.key]} onChange={() => handleSwitchChange(step.key)} />
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

export default KnowledgeExperience;
