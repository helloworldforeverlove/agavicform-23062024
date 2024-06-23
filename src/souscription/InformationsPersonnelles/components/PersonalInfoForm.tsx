// src/pages/PersonalInfoForm.tsx
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
    AlertDialogOverlay,
    Input,
    Select,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { useUuid } from './../../../context/UuidContext';
import Stepper from '../../../components/Stepper';

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

const PersonalInfoForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        civilite: '',
        dateDeNaissance: '',
        nom: '',
        prenom: '',
        paysDeNaissance: '',
        lieuDeNaissance: '',
    });

    const [errors, setErrors] = useState({
        civilite: false,
        dateDeNaissance: false,
        nom: false,
        prenom: false,
        paysDeNaissance: false,
        lieuDeNaissance: false,
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const civilite = await getResponse(1);
            const dateDeNaissance = await getResponse(2);
            const nom = await getResponse(3);
            const prenom = await getResponse(4);
            const paysDeNaissance = await getResponse(5);
            const lieuDeNaissance = await getResponse(6);

            setFormValues({
                civilite: civilite || '',
                dateDeNaissance: dateDeNaissance || '',
                nom: nom || '',
                prenom: prenom || '',
                paysDeNaissance: paysDeNaissance || '',
                lieuDeNaissance: lieuDeNaissance || '',
            });
        };

        fetchResponse();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCiviliteChange = (civilite: string) => {
        setFormValues({
            ...formValues,
            civilite,
        });
    };

    const validateForm = () => {
        const newErrors = {
            civilite: formValues.civilite === '',
            dateDeNaissance: formValues.dateDeNaissance === '',
            nom: formValues.nom === '',
            prenom: formValues.prenom === '',
            paysDeNaissance: formValues.paysDeNaissance === '',
            lieuDeNaissance: formValues.lieuDeNaissance === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await updateResponse(1, formValues.civilite);
            await updateResponse(2, formValues.dateDeNaissance);
            await updateResponse(3, formValues.nom);
            await updateResponse(4, formValues.prenom);
            await updateResponse(5, formValues.paysDeNaissance);
            await updateResponse(6, formValues.lieuDeNaissance);
            navigate('/next-step'); // Replace with the actual next step
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
      <Stepper currentStep={1} />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Veuillez entrer vos informations personnelles
                </Text>
                <VStack spacing={4} align="stretch" mx="auto">
                    <Box>
                        <Text fontSize="md" mb={2}>Civilité</Text>
                        <HStack justifyContent="center" mb={6}>
                            <Button
                                type="button"
                                onClick={() => handleCiviliteChange('Monsieur')}
                                isActive={formValues.civilite === 'Monsieur'}
                                colorScheme={formValues.civilite === 'Monsieur' ? 'green' : 'gray'}
                                borderColor={formValues.civilite === 'Monsieur' ? 'green.400' : 'gray.200'}
                                variant="outline"
                            >
                                Monsieur
                            </Button>
                            <Button
                                type="button"
                                onClick={() => handleCiviliteChange('Madame')}
                                isActive={formValues.civilite === 'Madame'}
                                colorScheme={formValues.civilite === 'Madame' ? 'green' : 'gray'}
                                borderColor={formValues.civilite === 'Madame' ? 'green.400' : 'gray.200'}
                                variant="outline"
                            >
                                Madame
                            </Button>
                        </HStack>
                    </Box>

                    <Box>
                        <Text fontSize="md" mb={2}>Date de naissance</Text>
                        <Input
                            type="date"
                            name="dateDeNaissance"
                            value={formValues.dateDeNaissance}
                            onChange={handleInputChange}
                            isInvalid={errors.dateDeNaissance}
                            mb={4}
                        />
                    </Box>

                    <Box>
                        <Text fontSize="md" mb={2}>Nom</Text>
                        <Input
                            type="text"
                            name="nom"
                            value={formValues.nom}
                            onChange={handleInputChange}
                            isInvalid={errors.nom}
                            mb={4}
                        />
                    </Box>

                    <Box>
                        <Text fontSize="md" mb={2}>Prénom</Text>
                        <Input
                            type="text"
                            name="prenom"
                            value={formValues.prenom}
                            onChange={handleInputChange}
                            isInvalid={errors.prenom}
                            mb={4}
                        />
                    </Box>

                    <Box>
                        <Text fontSize="md" mb={2}>Pays de naissance</Text>
                        <Select
                            name="paysDeNaissance"
                            value={formValues.paysDeNaissance}
                            onChange={handleInputChange}
                            isInvalid={errors.paysDeNaissance}
                            mb={4}
                        >
                            <option value="">Veuillez sélectionner</option>
                            <option value="france">France</option>
                            <option value="usa">USA</option>
                            {/* Add other countries as needed */}
                        </Select>
                    </Box>

                    <Box>
                        <Text fontSize="md" mb={2}>Lieu de naissance</Text>
                        <Input
                            type="text"
                            name="lieuDeNaissance"
                            value={formValues.lieuDeNaissance}
                            onChange={handleInputChange}
                            isInvalid={errors.lieuDeNaissance}
                            mb={4}
                        />
                    </Box>
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
                        onClick={handleSubmit}
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
                            Veuillez remplir tous les champs avant de continuer. 😊
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

export default PersonalInfoForm;
