import React, { useState, useRef, useEffect } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    SimpleGrid,
    Icon,
    Input,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { FcGenealogy, FcMoneyTransfer, FcHome, FcCalculator, FcIdea } from 'react-icons/fc';
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
    const [otherText, setOtherText] = useState<string>('');
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
        if (option !== 'autre') {
            await updateResponse(1, option);
            navigate('/quel-montant-souhaitez-vous-placer');
        }
    };

    const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 50) {
            setOtherText(event.target.value);
        }
    };

    const handleNext = async () => {
        if (selected) {
            await updateResponse(1, selected === 'autre' ? otherText : selected);
            navigate('/quel-montant-souhaitez-vous-placer');
        } else {
            setIsAlertOpen(true);
        }
    };

    const buttons = [
        { label: 'Constituer un patrimoine', icon: FcGenealogy, key: 'patrimoine' },
        { label: 'Préparer ma retraite', icon: FcMoneyTransfer, key: 'retraite' },
        { label: 'Financer des projets (études des enfants, immobilier)', icon: FcHome, key: 'projets' },
        { label: 'Limiter ma fiscalité', icon: FcCalculator, key: 'fiscalite' },
        { label: 'Autre (préciser)', icon: FcIdea, key: 'autre' },
    ];

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={1} totalSubSteps={25} title="Quel est votre projet ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel est votre projet ?</Text>
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
                {selected === 'autre' && (
                    <Box mt={4}>
                        <Input
                            placeholder="Précisez votre projet (max 50 caractères)"
                            value={otherText}
                            onChange={handleOtherChange}
                            maxLength={50}
                        />
                    </Box>
                )}
                <Box textAlign="right">
                    <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>Suivant</Button>
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
                            <Button ref={cancelRef} onClick={onClose}>OK</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    );
};

export default QuelEstVotreProjetDInvestissement;
