// src/pages/EstimationPatrimoineFoyer.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  Button,
  SimpleGrid,
  Icon,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import {
  FcMoneyTransfer,
  FcGenealogy,
  FcHome,
  FcCalculator,
  FcIdea,
} from 'react-icons/fc';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';
import { useUuid } from '../context/UuidContext';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    orange: '#FF8C00',
  },
});

const EstimationPatrimoineFoyer: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { uuid, updateResponse, getResponse } = useUuid();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await getResponse(13);
      if (response !== null) {
        // Ici, nous supposons que la réponse est enregistrée comme une chaîne correspondant à la clé sélectionnée
        setSelected(response);
      }
    };

    fetchResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = async (option: string) => {
    setSelected(option);
    // Si l'option sélectionnée n'est pas "autre" (requérant une précision), on peut enregistrer et naviguer directement
    if (option !== 'autre') {
      await updateResponse(13, option);
      navigate('/prochaine-etape');
    }
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Limite de 50 caractères pour l'option "Plus d'un million"
    if (event.target.value.length <= 50) {
      setOtherText(event.target.value);
    }
  };

  const handleNext = async () => {
    if (selected) {
      // Pour l'option "autre", on enregistre la précision saisie ; sinon, on enregistre directement l'option
      await updateResponse(13, selected === 'autre' ? otherText : selected);
      navigate('/prochaine-etape');
    } else {
      setIsAlertOpen(true);
    }
  };

  const options = [
    {
      label: 'Entre 0 et 100 000 €',
      icon: FcMoneyTransfer,
      key: 'range1',
    },
    {
      label: 'Entre 100 000 et 300 000 €',
      icon: FcGenealogy,
      key: 'range2',
    },
    {
      label: 'Entre 300 000 et 500 000 €',
      icon: FcHome,
      key: 'range3',
    },
    {
      label: 'Entre 500 000 et 1 000 000 €',
      icon: FcCalculator,
      key: 'range4',
    },
    {
      label: "Plus d'un million (précisez)",
      icon: FcIdea,
      key: 'autre',
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <StepperWithSubStepCounter
        currentStep={1}
        currentSubStep={12}
        totalSubSteps={25}
        title="Estimation du patrimoine du foyer"
      />
      <Box p={5} maxW="1000px" mx="auto">
        <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
          Quelle est l'estimation du patrimoine de votre foyer ?
        </Text>
        <SimpleGrid columns={[1, 2]} spacing={5}>
          {options.map((option) => (
            <Button
              key={option.key}
              leftIcon={<Icon as={option.icon} boxSize={5} />}
              variant={selected === option.key ? 'solid' : 'outline'}
              colorScheme={selected === option.key ? 'yellow' : 'blue'}
              onClick={() => handleSelect(option.key)}
              justifyContent="flex-start"
              px={6}
              py={6}
              size="xxl"
              textAlign="left"
            >
              <Box flex="1" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {option.label}
              </Box>
            </Button>
          ))}
        </SimpleGrid>
        {selected === 'autre' && (
          <Box mt={4}>
            <Input
              placeholder="Précisez (max 50 caractères)"
              value={otherText}
              onChange={handleOtherChange}
              maxLength={50}
            />
          </Box>
        )}
        <Box textAlign="right">
          <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>
            Suivant
          </Button>
        </Box>
      </Box>

      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={() => setIsAlertOpen(false)}>
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
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
};

export default EstimationPatrimoineFoyer;
