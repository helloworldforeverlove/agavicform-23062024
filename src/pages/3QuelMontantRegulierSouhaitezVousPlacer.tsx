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

const monthlyInvestmentOptions = [
    "< 250 €",
    "250 € à 500 €",
    "500 € à 1 000 €",
    "1 000 € à 2 500 €",
    "> 2 500 €"
];

const QuelMontantRegulierSouhaitezVousPlacer: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(3);
            if (response !== null && monthlyInvestmentOptions.includes(response)) {
                setSelectedAmount(response);
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleSelect = async (amount: string) => {
        setSelectedAmount(amount);
        await updateResponse(3, amount);
        navigate('/revenus-annuels');
    };

    const handleNext = async () => {
        if (selectedAmount !== null) {
            await updateResponse(3, selectedAmount);
            navigate('/revenus-annuels');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={3} totalSubSteps={25} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Combien pouvez-vous épargner chaque mois ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Placer de l'argent tous les mois pourrait faire une grande différence dans quelques années.
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>Sélectionnez parmi les choix suivants :</Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {monthlyInvestmentOptions.map((amount) => (
                        <Button
                            key={amount}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedAmount === amount ? 'yellow' : 'blue'}
                            onClick={() => handleSelect(amount)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedAmount === amount ? 'yellow.400' : 'gray.200'}
                        >
                            {amount}
                        </Button>
                    ))}
                </HStack>
                {selectedAmount !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="yellow.400">
                        <Text fontSize="2xl" color="yellow.500">
                            {selectedAmount}
                        </Text>
                    </Box>
                )}
                <Text textAlign="center" mt="8">
                    Les versements sont modulables : placez le montant que vous souhaitez, à la fréquence que vous souhaitez. Ils sont modifiables à tout moment.               </Text>
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="lg">
                        Retour
                    </Button>
                    <Button
                        colorScheme="yellow"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="lg">
                        Suivant
                    </Button>
                </HStack>
            </Box>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <WarningIcon color="orange" mr={2} />
                            Sélection requise
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Veuillez sélectionner un montant avant de continuer. 😊
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

export default QuelMontantRegulierSouhaitezVousPlacer;
