import React, { useState, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    HStack,
    RadioGroup,
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

const childrenOptions = [
    { value: 'none', label: 'Aucun' },
    { value: 'one', label: '1 enfant' },
    { value: 'two', label: '2 enfants' },
    { value: 'threeOrMore', label: '3 ou plus' },
];

const NombreEnfantsACharge: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Change from string | null to string | undefined
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (selectedOption !== undefined) {
            navigate('/revenus-annuels'); // Replace '/revenus-annuels' with the appropriate next route
        } else {
            setIsAlertOpen(true);
        }
    }; 

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={8} totalSubSteps={24} title="Parlons de votre situation familiale" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Combien d'enfants avez-vous à charge ?
                </Text>
                <RadioGroup onChange={handleSelect} value={selectedOption}>
                    <HStack spacing={8} justify="center">
                        {childrenOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant="outline"
                                size="xxl"
                                colorScheme={selectedOption === option.value ? 'green' : 'blue'}
                                onClick={() => handleSelect(option.value)}
                                px={6}
                                py={6}
                                textAlign="left"
                                justifyContent="flex-start"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={selectedOption === option.value ? 'green.400' : 'gray.200'}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </HStack>
                </RadioGroup>
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                        Retour
                    </Button>
                    <Button colorScheme="green" onClick={handleNext} px={6} py={6} size="lg">
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

export default NombreEnfantsACharge;
