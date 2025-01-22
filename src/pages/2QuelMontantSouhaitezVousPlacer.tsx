import React, { useState, useRef, useEffect } from 'react';
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

// Ajout d'une entrée spécifique pour 150 000 et +
const investmentOptions = [5000, 10000, 30000, 50000, 150000];

const QuelMontantSouhaitezVousPlacer: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(2);
            if (response !== null) {
                setSelectedAmount(parseInt(response, 10));
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = async (amount: number) => {
        setSelectedAmount(amount);
        await updateResponse(2, amount.toString());
        navigate('/quel-montant-regulier-souhaitez-vous-placer');
    };

    const handleNext = async () => {
        if (selectedAmount !== null) {
            await updateResponse(2, selectedAmount.toString());
            navigate('/quel-montant-regulier-souhaitez-vous-placer');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={2} totalSubSteps={25} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel montant souhaitez-vous placer initialement chez EPARGNE+ ?</Text>
                <Text fontSize="md" textAlign="center" mb={6}>Sélectionnez parmi les choix suivants :</Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {investmentOptions.map((amount) => (
                        <Button
                            key={amount}
                            variant="outline"
                            size="xxl"
                            colorScheme={selectedAmount === amount ? 'yellow' : 'blue'}
                            onClick={() => handleSelect(amount)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedAmount === amount ? 'yellow.400' : 'gray.200'}
                        >
                            {amount === 150000 ? '150 000 et + €' : `${amount.toLocaleString('fr-FR')} €`}
                        </Button>
                    ))}
                </HStack>
                {selectedAmount !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="yellow.400">
                        <Text fontSize="2xl" color="yellow.500">
                            {selectedAmount === 150000 ? '150 000 et + €' : `${selectedAmount.toLocaleString('fr-FR')} €`}
                        </Text>
                    </Box>
                )}
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="xxl">
                        Retour
                    </Button>
                    <Button
                        colorScheme="yellow"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="xxl">
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

export default QuelMontantSouhaitezVousPlacer;
