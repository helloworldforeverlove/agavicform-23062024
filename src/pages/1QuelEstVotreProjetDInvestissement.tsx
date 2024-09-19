import React, { useState, useRef, useEffect } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    SimpleGrid,
    Icon,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import {
    FcApproval, FcDisapprove, FcProcess, FcBusinessContact, FcReadingEbook, FcManager, FcParallelTasks
} from 'react-icons/fc';
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

const QuelEstVotreProjetDInvestissement: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(1);
            if (response !== null) {
                setSelected(response);
            }
        };

        fetchResponse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleSelect = async (option: string) => {
        setSelected(option);
        await updateResponse(1, option);
        navigate('/quel-montant-souhaitez-vous-placer');
    };

    const handleNext = async () => {
        if (selected) {
            await updateResponse(1, selected);
            navigate('/quel-montant-souhaitez-vous-placer');
        } else {
            setIsAlertOpen(true);
        }
    };

    const buttons = [
        { label: 'Faire fructifier mon épargne', icon: FcApproval, key: 'fructifier' },
        { label: 'Épargner en cas de coup dur', icon: FcDisapprove, key: 'epargner' },
        { label: 'Acheter un bien immobilier', icon: FcProcess, key: 'achat' },
        { label: 'Préparer ma retraite', icon: FcBusinessContact, key: 'retraite' },
        { label: 'Transmettre mon patrimoine', icon: FcReadingEbook, key: 'patrimoine' },
        { label: 'Ouvrir un compte enfant', icon: FcManager, key: 'compte' },
        { label: 'Organiser ma trésorerie pro', icon: FcParallelTasks, key: 'tresorerie' },
    ];

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={1} totalSubSteps={25} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel est votre projet d’investissement ?</Text>
                <SimpleGrid columns={[1, 2]} spacing={5}>
                    {buttons.map(button => (
                        <Button
                            key={button.key}
                            leftIcon={<Icon as={button.icon} boxSize={5} />}
                            variant={selected === button.key ? 'solid' : 'outline'}
                            colorScheme={selected === button.key ? 'yellow' : 'blue'}
                            onClick={() => handleSelect(button.key)}
                            justifyContent="flex-start"
                            px={6}
                            py={6}
                            size="xxl"
                            textAlign="left"
                        >
                            <Box flex="1" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                {button.label}
                            </Box>
                        </Button>
                    ))}
                </SimpleGrid>
                <Box textAlign="right">
                    <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>Suivant</Button>
                </Box>
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

export default QuelEstVotreProjetDInvestissement;
