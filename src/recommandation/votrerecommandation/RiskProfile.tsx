import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Switch,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react';
import { FaAward, FaLeaf, FaQuestionCircle } from 'react-icons/fa';
import { supabase } from './../../supabaseClient'; // Importez votre client Supabase
import { useUuid } from './../../context/UuidContext';
import ProfileSelection from '../modal/ProfileSelection';
import ProjectModification from '../modal/ProjectModification';
import EnvelopeSelection from '../modal/EnvelopeSelection';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    green: {
      400: '#38A169',
    },
    blue: {
      400: '#3182CE',
    },
    red: {
      200: '#FC8181', // Adjusted from orange
      400: '#F56565',
      600: '#E53E3E',
    },
    yellow: {
      400: '#ECC94B',
    },
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
});

const RiskProfile: React.FC = () => {
  const [initialPayment, setInitialPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState('');
  const [esgPreference, setEsgPreference] = useState(false);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [colorCode, setColorCode] = useState<string>('blue.400');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEnvelopeModalOpen, setIsEnvelopeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { uuid } = useUuid();

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select('step2, step3, step4, step7, risk_score, color_code')
        .eq('id', uuid)
        .single();

      if (error) {
        console.error('Error fetching project data:', error);
      } else {
        setInitialPayment(data?.step2 || '');
        setMonthlyPayment(data?.step3 || '');
        setInvestmentHorizon(data?.step4 || '');
        setEsgPreference(data?.step7 === 'ESG');
        setRiskScore(data?.risk_score || null);
        setColorCode(data?.color_code || 'blue.400');
      }
    };

    fetchProjectData();
  }, [uuid]);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  const openEnvelopeModal = () => {
    setSelectedProject('epargner'); // Set the selected project based on your logic
    setIsEnvelopeModalOpen(true);
  };
  const closeEnvelopeModal = () => setIsEnvelopeModalOpen(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleEsgPreferenceChange = async () => {
    const newPreference = !esgPreference;
    setEsgPreference(newPreference);

    const { error } = await supabase
      .from('form_responses')
      .update({ step7: newPreference ? 'ESG' : 'Non-ESG' })
      .eq('id', uuid);

    if (error) {
      console.error('Error updating ESG preference:', error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5} maxW="400px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        {/* Section 1: Votre projet */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre projet
          </Text>
          <Link color="blue.400" onClick={openProjectModal}>
            Modifier
          </Link>
        </HStack>
        <VStack align="stretch" spacing={2} mb={4}>
          <HStack justifyContent="space-between">
            <Text>Versement initial</Text>
            <Text>{initialPayment} €</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Versement mensuel</Text>
            <Text>{monthlyPayment} € / mois</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Horizon de placement</Text>
            <Text>{investmentHorizon} ans</Text>
          </HStack>
        </VStack>

        {/* Section 2: Votre enveloppe */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre enveloppe
          </Text>
          <Link color="blue.400" onClick={openEnvelopeModal}>
            Modifier
          </Link>
        </HStack>
        <HStack justifyContent="space-between" mb={4}>
          <HStack>
            <Box as={FaAward} color="blue.400" w={6} h={6} />
            <VStack align="start" spacing={0}>
              <Text>Assurance-vie</Text>
              <Text fontSize="sm" color="gray.500">Mandat d'arbitrage</Text>
            </VStack>
            <HStack spacing={1} ml={2}>
              <Icon as={FaQuestionCircle} color="gray.500" />
            </HStack>
          </HStack>
        </HStack>

        {/* Section 3: Votre allocation */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre allocation
          </Text>
          <Link color="blue.400" onClick={openProfileModal}>
            Modifier
          </Link>
        </HStack>
        <Text mb={4}>
          <Box as="span" mr={2} p={2} bg={colorCode || 'blue.400'} color="white" borderRadius="md">
            {riskScore !== null ? riskScore : 'N/A'}
          </Box>
          Profil de risque
        </Text>
        <Text mb={4}>
          Un profil de risque {riskScore !== null ? riskScore : 'N/A'} chez Agavic correspond à un profil de risque de {riskScore !== null ? Math.ceil((riskScore / 10) * 7) : 'N/A'} sur l'échelle du SRI, l’indicateur européen de référence du risque.
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text>Investissement responsable</Text>
            <FaLeaf color="yellow" />
          </HStack>
          <Switch colorScheme="blue" isChecked={esgPreference} onChange={handleEsgPreferenceChange} />
        </HStack>
      </Box>

      <ProjectModification isOpen={isProjectModalOpen} onClose={closeProjectModal} />
      <EnvelopeSelection isOpen={isEnvelopeModalOpen} onClose={closeEnvelopeModal} selectedProject={selectedProject} />
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal} size="xl">
        <ModalOverlay />
        <ModalContent maxWidth="90%">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileSelection />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default RiskProfile;
