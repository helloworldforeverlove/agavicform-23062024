import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    VStack,
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

const besoinOptions = [
    { value: 'certainementPas', label: 'Certainement pas' },
    { value: 'probablementPas', label: 'Probablement pas' },
    { value: 'probablement', label: 'Probablement' },
    { value: 'tresProbablement', label: 'Très probablement' },
];

const BesoinEpargne: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(15);
            if (response !== null) {
                setSelectedOption(response);
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    const handleNext = async () => {
        if (selectedOption !== undefined) {
            await updateResponse(15, selectedOption);
            navigate('/besoin-investissement');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={15} totalSubSteps={24} title="Pourriez-vous avoir besoin de toute l'épargne placée chez Agavic d'ici 2 ans ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Pourriez-vous avoir besoin de toute l'épargne placée chez Agavic d'ici 2 ans ?
                </Text>
                <VStack spacing={4} align="stretch">
                    {besoinOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedOption === option.value ? 'green' : 'gray'}
                            onClick={() => handleSelect(option.value)}
                            px={10}
                            py={6}
                            textAlign="center"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option.value ? 'green.400' : 'gray.200'}
                        >
                            {option.label}
                        </Button>
                    ))}
                </VStack>

                <Box mt={8} display="flex" justifyContent="space-between">
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
                        colorScheme="green"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="lg"
                    >
                        Suivant
                    </Button>
                </Box>
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

export default BesoinEpargne;
