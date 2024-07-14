// src/pages/ValeurPatrimoineImmobilierNet.tsx
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
        green: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
});

const ValeurPatrimoineImmobilierNet: React.FC = () => {
    const [value, setValue] = useState<number | null>(null);
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
            const response = await getResponse(12);
            if (response !== null) {
                const value = parseInt(response, 10);
                if (!isNaN(value)) {
                    setValue(value);
                }
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatNumberWithSpaces = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\s+/g, '');
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            setValue(parsedValue);
            setIsInvalidInput(false);
        } else {
            setValue(null);
            setIsInvalidInput(true);
        }
    };

    const handleNext = async () => {
        if (value !== null) {
            await updateResponse(12, value.toString());
            navigate('/montant-patrimoine-financier');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={11} totalSubSteps={25} title="Quelle est la valeur de votre patrimoine immobilier NET ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quelle est la valeur de votre patrimoine immobilier NET ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Additionnez la valeur de vos biens (appartement, maison) puis déduisez le montant qu'il vous reste à rembourser. Une estimation nous convient.
                </Text>
                <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                    <InputGroup size="lg" width="auto">
                        <Input
                            type="text"
                            min={0}
                            value={value !== null ? formatNumberWithSpaces(value) : ''}
                            onChange={handleInputChange}
                            placeholder="Entrez une valeur"
                            size="lg"
                            textAlign="center"
                            isInvalid={isInvalidInput}
                        />
                        <InputRightAddon children="€" />
                    </InputGroup>
                </Box>
                <Box display="flex" justifyContent="center" mb={6}>
                    <Alert status="info" borderRadius="md">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>
                                Par exemple, si vous êtes propriétaire d'un bien immobilier de 300 000 € et qu'il vous reste 200 000 € à rembourser sur votre crédit, il vous faut renseigner la différence entre les deux, soit 100 000 €.
                            </AlertTitle>
                        </Box>
                    </Alert>
                </Box>

                {isInvalidInput && (
                    <Alert status="error" mb={4} borderRadius="md">
                        <AlertIcon />
                        <AlertTitle mr={2}></AlertTitle>
                        Veuillez entrer une valeur valide pour le patrimoine immobilier net.
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsInvalidInput(false)} />
                    </Alert>
                )}

                {value !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="yellow.400">
                        <Text fontSize="2xl" color="yellow.500">
                            {formatNumberWithSpaces(value)} €
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
                            Veuillez entrer une valeur de patrimoine immobilier net avant de continuer. 😊
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

export default ValeurPatrimoineImmobilierNet;
