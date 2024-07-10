// src/pages/QuelEstVotreHorizonDInvestissement.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    HStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
    InputGroup,
    InputRightAddon,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
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

const QuelEstVotreHorizonDInvestissement: React.FC = () => {
    const [selectedHorizon, setSelectedHorizon] = useState<number | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const onClose = () => {
        setIsAlertOpen(false);
        setIsInvalidInput(false);
    };
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(4);
            if (response !== null) {
                const value = parseInt(response, 10);
                if (value >= 2 && value <= 30) {
                    setSelectedHorizon(value);
                }
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 2 && value <= 30) {
            setSelectedHorizon(value);
            setIsInvalidInput(false);
        } else {
            setSelectedHorizon(null);
            setIsInvalidInput(true);
        }
    };

    const handleNext = async () => {
        if (selectedHorizon !== null) {
            await updateResponse(4, selectedHorizon.toString());
            navigate('/quel-est-votre-date-de-naissance'); // Remplacez '/quel-est-votre-date-de-naissance' par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={4} totalSubSteps={24} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Dans combien de temps souhaitez-vous profiter de cet investissement ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Cette information nous permet de vous proposer une simulation en accord avec votre horizon d'investissement. Votre argent pourra être débloqué avant sans difficulté et sans frais.
                </Text>
                <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                    <InputGroup size="lg" width="auto">
                        <Input
                            type="number"
                            min={2}
                            max={30}
                            value={selectedHorizon !== null ? selectedHorizon : ''}
                            onChange={handleInputChange}
                            placeholder="Entrez un nombre entre 2 et 30 ans"
                            size="lg"
                            textAlign="center"
                            isInvalid={isInvalidInput}
                        />
                        <InputRightAddon children="ans" />
                    </InputGroup>
                </Box>

                {isInvalidInput && (
                    <Alert status="error" mb={4} borderRadius="md">
                        <AlertIcon />
                        <AlertTitle mr={2}></AlertTitle>
                        Votre horizon d’investissement doit être compris entre 2 et 30 ans.
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsInvalidInput(false)} />
                    </Alert>
                )}

                {selectedHorizon !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="yellow.400">
                        <Text fontSize="2xl" color="yellow.500">
                            {selectedHorizon} ans
                        </Text>
                    </Box>
                )}
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                        Retour
                    </Button>
                    <Button colorScheme="yellow" onClick={handleNext} px={6} py={6} size="lg">
                        Suivant
                    </Button>
                </HStack>
            </Box>

            <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <WarningIcon color="orange" mr={2} />
                            Sélection requise
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Veuillez entrer un horizon d'investissement valide (entre 2 et 30 ans) avant de continuer. 😊
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

export default QuelEstVotreHorizonDInvestissement;
