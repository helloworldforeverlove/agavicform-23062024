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

const ResidencePrincipale: React.FC = () => {
    const [residenceStatus, setResidenceStatus] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(10);
            if (response !== null) {
                setResidenceStatus(response);
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = async (value: string) => {
        setResidenceStatus(value);
        await updateResponse(10, value);
        if (value === 'oui') {
            navigate('/montant-credit-immobilier-mensuel');
        } else {
            navigate('/montant-loyer-mensuel');
        }
    };

    const handleNext = async () => {
        if (residenceStatus !== undefined) {
            await updateResponse(10, residenceStatus);
            if (residenceStatus === 'oui') {
                navigate('/montant-credit-immobilier-mensuel');
            } else {
                navigate('/montant-loyer-mensuel');
            }
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={9} totalSubSteps={25} title="Êtes-vous propriétaire de votre résidence principale ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Êtes-vous propriétaire de votre résidence principale ?
                </Text>
                <HStack justifyContent="center" spacing="4">
                    <Button
                        variant="outline"
                        colorScheme={residenceStatus === 'oui' ? 'yellow' : 'gray'}
                        borderColor={residenceStatus === 'oui' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('oui')}
                        px={10}
                        py={6}
                        size="xxl"
                        _hover={{ bg: 'gray.200' }}
                    >
                        Oui
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme={residenceStatus === 'non' ? 'yellow' : 'gray'}
                        borderColor={residenceStatus === 'non' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('non')}
                        px={10}
                        py={6}
                        size="xxl"
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

export default ResidencePrincipale;
