// src/pages/EtesVousResidentFiscalFrancais.tsx
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
    AlertDialogOverlay
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

const EtesVousResidentFiscalFrancais: React.FC = () => {
    const [residentFiscal, setResidentFiscal] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(6);
            if (response !== null) {
                setResidentFiscal(response);
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleSelect = (value: string) => {
        setResidentFiscal(value);
    };

    const handleNext = async () => {
        if (residentFiscal !== undefined) {
            await updateResponse(6, residentFiscal);
            navigate('/esg-preference');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={5} totalSubSteps={25} title="Parlons de votre résidence fiscale" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Êtes-vous résident fiscal français ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Si vous payez des impôts sur le revenu en France, DOM inclus, vous êtes résident fiscal français.
                </Text>
                <HStack justifyContent="center" spacing="4">
                    <Button
                        variant="outline"
                        colorScheme={residentFiscal === 'oui' ? 'yellow' : 'gray'}
                        borderColor={residentFiscal === 'oui' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('oui')}
                        px={10}
                        py={6}
                        size="lg"
                        _hover={{ bg: 'gray.200' }}
                    >
                        Oui
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme={residentFiscal === 'non' ? 'yellow' : 'gray'}
                        borderColor={residentFiscal === 'non' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('non')}
                        px={10}
                        py={6}
                        size="lg"
                        _hover={{ bg: 'gray.200' }}
                    >
                        Non
                    </Button>
                </HStack>

                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="lg"
                    >
                        Retour
                    </Button>
                    <Button
                        colorScheme="yellow"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="lg"
                    >
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

export default EtesVousResidentFiscalFrancais;
