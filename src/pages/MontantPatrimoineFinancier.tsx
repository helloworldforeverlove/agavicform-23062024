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

const MontantPatrimoineFinancier: React.FC = () => {
    const [value, setValue] = useState<number | null>(null);
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
            setValue(value);
            setIsInvalidInput(false);
        } else {
            setValue(null);
            setIsInvalidInput(true);
        }
    };

    const handleNext = () => {
        if (value !== null) {
            navigate('/montant-epargne-mensuel'); // Remplacez '/prochaine-etape' par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={13} totalSubSteps={24} title="Quel est le montant estimé de votre patrimoine financier ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quel est le montant estimé de votre patrimoine financier ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Additionnez vos avoirs financiers : compte courant, livrets d'épargne, PEL, assurances-vie, PEA, comptes-titres, PEE, etc, sauf votre patrimoine immobilier. Une estimation suffit.
                </Text>
                <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                    <InputGroup size="lg" width="auto">
                        <Input
                            type="number"
                            min={0}
                            value={value !== null ? value : ''}
                            onChange={handleInputChange}
                            placeholder="Entrez une valeur"
                            size="lg"
                            textAlign="center"
                            isInvalid={isInvalidInput}
                        />
                        <InputRightAddon children="€" />
                    </InputGroup>
                </Box>

                {isInvalidInput && (
                    <Alert status="error" mb={4} borderRadius="md">
                        <AlertIcon />
                        <AlertTitle mr={2}></AlertTitle>
                        Veuillez entrer une valeur valide pour le patrimoine financier.
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsInvalidInput(false)} />
                    </Alert>
                )}

                {value !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">
                            {value} €
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
                            Veuillez entrer une valeur de patrimoine financier avant de continuer. 😊
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

export default MontantPatrimoineFinancier;
