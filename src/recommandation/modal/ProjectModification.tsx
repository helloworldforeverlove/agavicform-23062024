import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { supabase } from './../../supabaseClient'; // Importez votre client Supabase
import { useUuid } from './../../context/UuidContext';

const ProjectModification: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [initialPayment, setInitialPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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

    if (isOpen) {
      fetchProjectData();
    }
  }, [isOpen, uuid]);

  const handleSave = async () => {
    const { error } = await supabase
      .from('form_responses')
      .update({
        step2: initialPayment,
        step3: monthlyPayment,
        step4: investmentHorizon,
      })
      .eq('id', uuid);

    if (error) {
      console.error('Error updating project data:', error);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2000); // Fermer le modal après 2 secondes
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modification de votre projet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold">Versement initial</Text>
                <Text color="gray.500" mb={2}>Il s'agit du 1er versement réalisé sur votre contrat PatriLife.</Text>
                <Input
                  value={initialPayment}
                  onChange={(e) => setInitialPayment(e.target.value)}
                  size="md"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Versement mensuel</Text>
                <Text color="gray.500" mb={2}>55% de nos clients placent en moyenne 200 € / mois.</Text>
                <Input
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  size="md"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Horizon de placement</Text>
                <Text color="gray.500" mb={2}>Votre investissement reste disponible à tout moment.</Text>
                <Input
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(e.target.value)}
                  size="md"
                />
              </Box>
            </VStack>
            <Button colorScheme="blue" mt={6} w="full" onClick={handleSave}>
              Valider
            </Button>
            {showAlert && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle>Mise à jour réussie!</AlertTitle>
                  <AlertDescription>
                    Les valeurs ont été mises à jour avec succès.
                  </AlertDescription>
                </Box>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
              </Alert>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectModification;
