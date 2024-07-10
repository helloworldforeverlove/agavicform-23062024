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

const gainLossOptions = [
    { value: 'gain20loss5', label: 'Espérance de gain final de 20%, mais avec un risque de perte de 5%' },
    { value: 'gain30loss10', label: 'Espérance de gain final de 30%, mais avec un risque de perte de 10%' },
    { value: 'gain50loss15', label: 'Espérance de gain final de 50%, mais avec un risque de perte de 15%' },
    { value: 'gain70lossMore15', label: 'Espérance de gain final de 70%, mais avec un risque de perte supérieur à 15%' },
];

const RapportGainsPertes10Ans: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(23);
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
            await updateResponse(23, selectedOption);
            navigate('/perte-valeur-investissement');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={23} totalSubSteps={24} title="Quel rapport gains / pertes êtes-vous prêt à accepter en investissant sur 10 ans ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quel rapport gains / pertes êtes-vous prêt à accepter en investissant sur 10 ans ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Là encore, nous cherchons à comprendre votre attitude face au risque.
                </Text>
                <VStack spacing={4} align="stretch">
                    {gainLossOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedOption === option.value ? 'yellow' : 'gray'}
                            onClick={() => handleSelect(option.value)}
                            px={10}
                            py={6}
                            textAlign="center"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option.value ? 'yellow.400' : 'gray.200'}
                            whiteSpace={{ base: 'normal', md: 'nowrap' }}
                            overflowWrap="break-word"
                            lineHeight={{ base: '1.5', md: 'normal' }} // Adjust line-height for small screens
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
                        colorScheme="yellow"
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

export default RapportGainsPertes10Ans;
