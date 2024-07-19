import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  ChakraProvider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  extendTheme,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';

interface ProfileOption {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

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
      500: '#2F855A',
    },
    blue: {
      400: '#3182CE',
    },
  },
});

const ProfileCard: React.FC<ProfileOption> = ({
  title,
  description,
  buttonText,
  icon,
  isSelected,
  onSelect,
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.300');
  const selectedBgColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box
      as="button"
      onClick={onSelect}
      border="1px"
      borderColor={isSelected ? selectedBorderColor : borderColor}
      borderRadius="md"
      p={4}
      bg={isSelected ? selectedBgColor : 'white'}
      textAlign="center"
      _hover={{ bg: useColorModeValue('gray.50', 'gray.800') }}
      _focus={{ boxShadow: 'outline' }}
    >
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
      <Box mb={4}>{icon}</Box>
      <Button colorScheme={isSelected ? 'blue' : 'gray'} onClick={onSelect}>
        {buttonText}
      </Button>
    </Box>
  );
};

const InvestorProfileSelector: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = React.useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { updateResponse, getResponse } = useUuid();

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await getResponse(90); // Assuming step 90
      if (response) {
        setSelectedProfile(response);
      }
    };

    fetchResponse();
  }, [getResponse]);

  const profiles: ProfileOption[] = [
    {
      title: 'Profil Prudent',
      description: 'Je recherche de la sécurité et mon épargne doit capitaliser tranquillement.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Prudent">🏃‍♂️</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Prudent',
      onSelect: () => handleSelect('Prudent'),
    },
    {
      title: 'Profil Equilibré',
      description: 'Je recherche la performance modérée et je limite mon risque de perte.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Equilibré">⚖️</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Equilibré',
      onSelect: () => handleSelect('Equilibré'),
    },
    {
      title: 'Profil Dynamique',
      description: 'Quitte à subir des pertes, je vise une performance maximale de mon investissement.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Dynamique">💪</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Dynamique',
      onSelect: () => handleSelect('Dynamique'),
    },
  ];

  const handleSelect = async (option: string) => {
    setSelectedProfile(option);
    await updateResponse(90, option); // Save the response for step 90
    setTimeout(() => {
      navigate('/next-step'); // Replace with the actual next step route
    }, 5000); // Delay navigation by 5 seconds
  };

  const handleNext = async () => {
    if (selectedProfile) {
      await updateResponse(90, selectedProfile);
      navigate('/next-step'); // Replace with the actual next step route
    } else {
      setIsAlertOpen(true);
    }
  };

  const onClose = () => setIsAlertOpen(false);

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Parmi ces trois profils d'investisseurs, sélectionnez celui qui vous ressemble :
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {profiles.map((profile) => (
            <ProfileCard key={profile.title} {...profile} />
          ))}
        </Grid>
        <Text mt={8} textAlign="center">
          Notez qu'il n'y a pas de bonnes ou mauvaises réponses à ce questionnaire. Tous les profils d'investisseurs sont bons.
          L'important est de répondre au meilleur de vos connaissances aux questions présentées. Vous obtenez ainsi une idée
          plus réaliste de votre profil d'investisseur. Cela vous aide à choisir des placements qui vous conviennent.
          Rappelez-vous qu'un placement qui convient à une personne que vous connaissez ne vous convient pas automatiquement!
        </Text>
        <Box textAlign="right">
          <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>Suivant</Button>
        </Box>
      </Box>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
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
    </ChakraProvider>
  );
};

export default InvestorProfileSelector;
