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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
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

const perceptionOptions = [
    { value: 'vrai', label: 'Vrai' },
    { value: 'faux', label: 'Faux' },
    { value: 'jeNeSaisPas', label: 'Je ne sais pas' },
];

const EtfCapitalGaranti: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(19);
            if (response !== null) {
                setSelectedOption(response);
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = async (value: string) => {
        setSelectedOption(value);
        await updateResponse(19, value);
        setTimeout(() => {
            navigate('/gestion-portefeuille');
        }, 5000); // Delay navigation by 5 seconds
    };

    const handleNext = async () => {
        if (selectedOption !== undefined) {
            await updateResponse(19, selectedOption);
            navigate('/gestion-portefeuille');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={18} totalSubSteps={25} title='"Un ETF est un fonds à capital garanti"' />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    "Un ETF est un fonds à capital garanti"
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    L'affirmation ci-dessus vous semble-t-elle vraie ?
                </Text>
                <VStack spacing={4} align="stretch">
                    {perceptionOptions.map((option) => (
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
                        >
                            {option.label}
                        </Button>
                    ))}
                </VStack>

                {selectedOption === 'faux' && (
                    <Box mt={8}>
                        <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Bonne réponse :</AlertTitle>
                                <AlertDescription>
                                    Un ETF est un fonds qui réplique un indice boursier. Il peut donc varier à la hausse comme à la baisse. Il ne s'agit donc pas d'un fonds à capital garanti.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </Box>
                )}

                {selectedOption === 'jeNeSaisPas' && (
                    <Box mt={8}>
                        <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Réponse :</AlertTitle>
                                <AlertDescription>
                                    Un ETF est un fonds qui réplique un indice boursier. Il peut donc varier à la hausse comme à la baisse. Il ne s'agit donc pas d'un fonds à capital garanti.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </Box>
                )}

                {selectedOption === 'vrai' && (
                    <Box mt={8}>
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Erreur :</AlertTitle>
                                <AlertDescription>
                                    Un ETF n'est pas un fonds à capital garanti. C'est un fonds qui réplique un indice boursier et peut varier à la hausse comme à la baisse.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </Box>
                )}

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

export default EtfCapitalGaranti;
