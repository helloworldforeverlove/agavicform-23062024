import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    HStack,
    Stack,
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

const ESGPreference: React.FC = () => {
    const [esgPreference, setEsgPreference] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(7);
            if (response !== null) {
                setEsgPreference(response);
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleSelect = (value: string) => {
        setEsgPreference(value);
    };

    const handleNext = async () => {
        if (esgPreference !== undefined) {
            await updateResponse(7, esgPreference);
            navigate('/nombre-enfants-a-charge');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={7} totalSubSteps={24} title="Préférence pour les investissements ESG" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Avez-vous une préférence pour des investissements respectant les critères environnementaux, sociaux et de gouvernance (ESG) ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    L’ESG est un ensemble de critères utilisés pour évaluer les pratiques durables et socialement responsables des entreprises. Cela inclut des facteurs tels que l'impact environnemental, les relations avec les employés et la qualité de la gouvernance.
                </Text>
                <Stack justifyContent="center" spacing="4" direction={{ base: 'column', md: 'row' }}>
                    <Button
                        variant="outline"
                        colorScheme={esgPreference === 'ESG' ? 'yellow' : 'gray'}
                        borderColor={esgPreference === 'ESG' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('ESG')}
                        px={10}
                        py={6}
                        size="lg"
                        _hover={{ bg: 'gray.200' }}
                    >
                        Préférence ESG
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme={esgPreference === 'Non-ESG' ? 'yellow' : 'gray'}
                        borderColor={esgPreference === 'Non-ESG' ? 'yellow.400' : 'gray.200'}
                        onClick={() => handleSelect('Non-ESG')}
                        px={10}
                        py={6}
                        size="lg"
                        _hover={{ bg: 'gray.200' }}
                    >
                        Pas de préférence ESG
                    </Button>
                </Stack>

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

export default ESGPreference;
