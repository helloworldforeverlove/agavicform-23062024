import React, { useState, useRef } from 'react';
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

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
        green: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
});

const MontantCreditImmobilierMensuel: React.FC = () => {
    const [credit, setCredit] = useState<number | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const onClose = () => {
        setIsAlertOpen(false);
        setIsInvalidInput(false);
    };
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setCredit(value);
            setIsInvalidInput(false);
        } else {
            setCredit(null);
            setIsInvalidInput(true);
        }
    };

    const handleNoCredit = () => {
        setCredit(0);
        setIsInvalidInput(false);
        setTimeout(() => {
            navigate('/valeur-patrimoine-immobilier-net'); // Remplacez '/prochaine-etape' par la route suivante appropriée
        }, 2000);
    };

    const handleNext = () => {
        if (credit !== null) {
            navigate('/valeur-patrimoine-immobilier-net'); // Remplacez '/prochaine-etape' par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={11} totalSubSteps={24} title="Combien remboursez-vous chaque mois pour votre crédit immobilier ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Combien remboursez-vous chaque mois pour votre crédit immobilier ?
                </Text>
                <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                    <InputGroup size="lg" width="auto">
                        <Input
                            type="number"
                            min={0}
                            value={credit !== null ? credit : ''}
                            onChange={handleInputChange}
                            placeholder="Entrez une valeur"
                            size="lg"
                            textAlign="center"
                            isInvalid={isInvalidInput}
                        />
                        <InputRightAddon children="€ / mois" />
                    </InputGroup>
                </Box>
                <Box display="flex" justifyContent="center" mb={6}>
                    <Button
                        variant="outline"
                        colorScheme="green"
                        onClick={handleNoCredit}
                        px={10}
                        py={6}
                        size="lg"
                    >
                        Aucun crédit immobilier
                    </Button>
                </Box>

                {isInvalidInput && (
                    <Alert status="error" mb={4} borderRadius="md">
                        <AlertIcon />
                        <AlertTitle mr={2}></AlertTitle>
                        Veuillez entrer une valeur valide pour le crédit immobilier.
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsInvalidInput(false)} />
                    </Alert>
                )}

                {credit !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">
                            {credit} € / mois
                        </Text>
                    </Box>
                )}

                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                        Retour
                    </Button>
                    <Button colorScheme="green" onClick={handleNext} px={6} py={6} size="lg">
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
                            Veuillez entrer un montant de crédit immobilier ou sélectionner "Aucun crédit immobilier" avant de continuer. 😊
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

export default MontantCreditImmobilierMensuel;
