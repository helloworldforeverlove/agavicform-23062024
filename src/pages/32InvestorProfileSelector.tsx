import React from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

interface ProfileOption {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

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

  const profiles: ProfileOption[] = [
    {
      title: 'Profil Prudent',
      description: 'Je recherche de la sécurité et mon épargne doit capitaliser tranquillement.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Prudent">🏃‍♂️</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Prudent',
      onSelect: () => setSelectedProfile('Prudent'),
    },
    {
      title: 'Profil Equilibré',
      description: 'Je recherche la performance modérée et je limite mon risque de perte.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Equilibré">⚖️</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Equilibré',
      onSelect: () => setSelectedProfile('Equilibré'),
    },
    {
      title: 'Profil Dynamique',
      description: 'Quitte à subir des pertes, je vise une performance maximale de mon investissement.',
      buttonText: 'Je continue avec ce profil',
      icon: <Box as="span" role="img" aria-label="Dynamique">💪</Box>, // Replace with actual icons
      isSelected: selectedProfile === 'Dynamique',
      onSelect: () => setSelectedProfile('Dynamique'),
    },
  ];

  return (
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
    </Box>
  );
};

export default InvestorProfileSelector;
