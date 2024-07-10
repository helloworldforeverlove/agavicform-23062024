import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Checkbox,
    Button,
    VStack,
    Image,
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
import { BiNews } from "react-icons/bi";
import { MdDiscount } from "react-icons/md";
import Stepper from '../components/Stepper';
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
    fonts: {
        body: 'Arial, sans-serif',
        heading: 'Arial, sans-serif',
    },
});

const NotificationPreferences: React.FC = () => {
    const [preferences, setPreferences] = useState<{ news: string, promo: string }>({ news: 'non', promo: 'non' });
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(25);
            if (response !== null) {
                try {
                    const parsedResponse = JSON.parse(response);
                    setPreferences(parsedResponse);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = async () => {
        if (preferences.news !== undefined && preferences.promo !== undefined) {
            setIsLoading(true);
            await updateResponse(25, JSON.stringify(preferences));
            setTimeout(() => {
                setIsLoading(false);
                navigate('/combined-risk-score');
            }, 2000);
        } else {
            setIsAlertOpen(true);
        }
    };

    const handleCheckboxChange = (type: 'news' | 'promo') => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreferences(prev => ({ ...prev, [type]: event.target.checked ? 'oui' : 'non' }));
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={1} />
            <Box mt={5} p={5} pt={10} maxW="1000px" mx="auto" textAlign="center" borderRadius="md" boxShadow="md" bg="white">
                <Text fontSize="2xl" fontWeight="bold" mb={5}>
                    Bravo, vous allez découvrir la simulation de votre projet d’épargne.
                </Text>
                <HStack justifyContent="space-between" alignItems="flex-start" spacing={10}>
                    <Image src="/newsletter.png" alt="Illustration" boxSize="300px" borderRadius="md" />
                    <VStack align="flex-start" spacing={4} maxW="600px">
                        <Text fontSize="lg" fontWeight="bold">Avant cela, dites-nous si vous souhaitez rester en contact.</Text>
                        <Text fontSize="md">Cochez les cases si vous souhaitez recevoir :</Text>
                        <Box
                            p={4}
                            border="1px"
                            borderColor={preferences.news === 'oui' ? "yellow.400" : "gray.200"}
                            borderRadius="md"
                            boxShadow="sm"
                            w="100%"
                            bg={preferences.news === 'oui' ? "yellow.50" : "white"}
                        >
                            <Checkbox
                                isChecked={preferences.news === 'oui'}
                                onChange={handleCheckboxChange('news')}
                            >
                                <HStack spacing={3} align="flex-start">
                                    <BiNews size="24px" />
                                    <Box>
                                        <Text fontWeight="bold" color={preferences.news === 'oui' ? "yellow.500" : "black"}>
                                            Les actualités et nos conseils
                                        </Text>
                                        <Text fontSize="sm">Une newsletter mensuelle de nos experts pour décrypter l'actualité financière et mieux gérer votre épargne.</Text>
                                    </Box>
                                </HStack>
                            </Checkbox>
                        </Box>
                        <Box
                            p={4}
                            border="1px"
                            borderColor={preferences.promo === 'oui' ? "yellow.400" : "gray.200"}
                            borderRadius="md"
                            boxShadow="sm"
                            w="100%"
                            bg={preferences.promo === 'oui' ? "yellow.50" : "white"}
                        >
                            <Checkbox
                                isChecked={preferences.promo === 'oui'}
                                onChange={handleCheckboxChange('promo')}
                            >
                                <HStack spacing={3} align="flex-start">
                                    <MdDiscount size="24px" />
                                    <Box>
                                        <Text fontWeight="bold" color={preferences.promo === 'oui' ? "yellow.500" : "black"}>
                                            Nos offres promotionnelles
                                        </Text>
                                        <Text fontSize="sm">Les bons plans Agavic adaptés à votre projet d’épargne une à deux fois par mois.</Text>
                                    </Box>
                                </HStack>
                            </Checkbox>
                        </Box>
                    </VStack>
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
                        isLoading={isLoading}
                        loadingText="Chargement"
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

export default NotificationPreferences;
