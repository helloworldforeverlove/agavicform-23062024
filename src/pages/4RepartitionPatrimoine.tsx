// src/pages/RepartitionPatrimoine.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  Button,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightAddon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
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

const RepartitionPatrimoine: React.FC = () => {
  // États pour chaque catégorie
  const [immobilier, setImmobilier] = useState<string>('');
  const [valeursMobilieres, setValeursMobilieres] = useState<string>('');
  const [epargne, setEpargne] = useState<string>('');
  const [assurance, setAssurance] = useState<string>('');
  const [autre, setAutre] = useState<string>('');

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { uuid, updateResponse, getResponse } = useUuid();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Optionnel : récupération de données enregistrées précédemment
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await getResponse(14);
      if (response !== null) {
        try {
          const parsed = JSON.parse(response);
          setImmobilier(parsed.immobilier || '');
          setValeursMobilieres(parsed.valeursMobilieres || '');
          setEpargne(parsed.epargne || '');
          setAssurance(parsed.assurance || '');
          setAutre(parsed.autre || '');
        } catch (error) {
          // En cas d'erreur de parsing, on ignore
        }
      }
    };
    fetchResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = async () => {
    // Vérifie que tous les champs sont renseignés et contiennent des valeurs numériques
    if (
      immobilier.trim() === '' ||
      valeursMobilieres.trim() === '' ||
      epargne.trim() === '' ||
      assurance.trim() === '' ||
      autre.trim() === '' ||
      isNaN(parseFloat(immobilier)) ||
      isNaN(parseFloat(valeursMobilieres)) ||
      isNaN(parseFloat(epargne)) ||
      isNaN(parseFloat(assurance)) ||
      isNaN(parseFloat(autre))
    ) {
      setIsAlertOpen(true);
      return;
    }

    const repartition = {
      immobilier: immobilier.trim(),
      valeursMobilieres: valeursMobilieres.trim(),
      epargne: epargne.trim(),
      assurance: assurance.trim(),
      autre: autre.trim(),
    };

    await updateResponse(14, JSON.stringify(repartition));
    navigate('/prochaine-etape');
  };

  return (
    <ChakraProvider theme={theme}>
      <StepperWithSubStepCounter
        currentStep={1}
        currentSubStep={5}  // À ajuster selon le total des sous-étapes
        totalSubSteps={25}
        title="Répartition du patrimoine"
      />
      <Box p={5} maxW="1000px" mx="auto">
        <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
          Répartition du patrimoine
        </Text>
        <Text fontSize="md" textAlign="center" mb={6}>
          Indiquez le pourcentage de chaque catégorie :
        </Text>
        <SimpleGrid columns={[1, 1]} spacing={4}>
          <Box>
            <Text mb={1}>Immobilier :</Text>
            <InputGroup>
              <Input
                type="number"
                placeholder="Ex: 40"
                value={immobilier}
                onChange={(e) => setImmobilier(e.target.value)}
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </Box>
          <Box>
            <Text mb={1}>Valeurs mobilières :</Text>
            <InputGroup>
              <Input
                type="number"
                placeholder="Ex: 30"
                value={valeursMobilieres}
                onChange={(e) => setValeursMobilieres(e.target.value)}
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </Box>
          <Box>
            <Text mb={1}>Épargne (ex. livret, PEA, etc.) :</Text>
            <InputGroup>
              <Input
                type="number"
                placeholder="Ex: 15"
                value={epargne}
                onChange={(e) => setEpargne(e.target.value)}
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </Box>
          <Box>
            <Text mb={1}>Assurance vie/capitalisation :</Text>
            <InputGroup>
              <Input
                type="number"
                placeholder="Ex: 10"
                value={assurance}
                onChange={(e) => setAssurance(e.target.value)}
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </Box>
          <Box>
            <Text mb={1}>Autre (préciser) :</Text>
            <InputGroup>
              <Input
                type="number"
                placeholder="Ex: 5"
                value={autre}
                onChange={(e) => setAutre(e.target.value)}
              />
              <InputRightAddon children="%" />
            </InputGroup>
          </Box>
        </SimpleGrid>
        <HStack justifyContent="flex-end" mt="8" spacing="4">
          <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="xxl">
            Retour
          </Button>
          <Button colorScheme="yellow" onClick={handleNext} px={6} py={6} size="xxl">
            Suivant
          </Button>
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <WarningIcon color="orange" mr={2} />
              Champs requis
            </AlertDialogHeader>
            <AlertDialogBody>
              Veuillez saisir un pourcentage valide pour chaque catégorie.
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

export default RepartitionPatrimoine;
