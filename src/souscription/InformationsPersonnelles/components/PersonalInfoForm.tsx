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
    Input,
    Select,
    HStack,
    useStyleConfig,
    InputProps,
    SelectProps,
    FormControl,
    Alert,
    AlertIcon,
    AlertDescription,
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
            500: '#2F855A',
        },
        blue: {
            400: '#3182CE',
        },
    },
    components: {
        CustomInput: {
            baseStyle: {
                borderColor: 'gray.200',
                _hover: {
                    borderColor: 'gray.500',
                },
                _focus: {
                    borderColor: 'gray.500',
                    boxShadow: '0 0 0 1px gray.500',
                },
            },
        },
    },
});

const CustomInput: React.FC<InputProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'green.500',
        color: 'green.500',
        boxShadow: '0 0 0 1px green.500',
    } : {};

    return (
        <Input
            sx={{
                ...styles,
                ...filledStyles,
            }}
            {...props}
        />
    );
};

const CustomSelect: React.FC<SelectProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'green.500',
        color: 'green.500',
        boxShadow: '0 0 0 1px green.500',
    } : {};

    return (
        <Select
            sx={{
                ...styles,
                ...filledStyles,
            }}
            {...props}
        />
    );
};

const PersonalInfoForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        civilite: '',
        dateDeNaissance: '',
        nom: '',
        prenom: '',
        paysDeNaissance: '',
        lieuDeNaissance: '',
        situationFamiliale: '',
        capaciteJuridique: '',
    });

    const [errors, setErrors] = useState({
        civilite: false,
        dateDeNaissance: false,
        nom: false,
        prenom: false,
        paysDeNaissance: false,
        lieuDeNaissance: false,
        situationFamiliale: false,
        capaciteJuridique: false,
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const civilite = await getResponse(27); // 'civilite' is step 27
            const dateDeNaissance = await getResponse(5); // 'dateDeNaissance' is step 5
            const nom = await getResponse(29); // 'nom' is step 29
            const prenom = await getResponse(30); // 'prenom' is step 30
            const paysDeNaissance = await getResponse(31); // 'paysDeNaissance' is step 31
            const lieuDeNaissance = await getResponse(32); // 'lieuDeNaissance' is step 32
            const situationFamiliale = await getResponse(33); // 'situationFamiliale' is step 33
            const capaciteJuridique = await getResponse(34); // 'capaciteJuridique' is step 34

            setFormValues({
                civilite: civilite || '',
                dateDeNaissance: dateDeNaissance || '',
                nom: nom || '',
                prenom: prenom || '',
                paysDeNaissance: paysDeNaissance || '',
                lieuDeNaissance: lieuDeNaissance || '',
                situationFamiliale: situationFamiliale || '',
                capaciteJuridique: capaciteJuridique || '',
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
            situationFamiliale: formValues.situationFamiliale === '',
            capaciteJuridique: formValues.capaciteJuridique === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const saveDataToDatabase = async (data: { [key: string]: string }) => {
        try {
            const response = await fetch(`https://wrzduukskbcqvxtqevpr.supabase.co/rest/v1/form_responses?id=eq.${uuid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'YOUR_SUPABASE_API_KEY', // Replace with your actual Supabase API key
                    'Authorization': `Bearer YOUR_SUPABASE_API_KEY` // Replace with your actual Supabase API key
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const result = await response.json();
            console.log('Data saved:', result);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await updateResponse(27, formValues.civilite);
            await updateResponse(5, formValues.dateDeNaissance);
            await updateResponse(29, formValues.nom);
            await updateResponse(30, formValues.prenom);
            await updateResponse(31, formValues.paysDeNaissance);
            await updateResponse(32, formValues.lieuDeNaissance);
            await updateResponse(33, formValues.situationFamiliale);
            await updateResponse(34, formValues.capaciteJuridique);

            // Save data to the database
            await saveDataToDatabase({
                step27: formValues.civilite,
                step5: formValues.dateDeNaissance,
                step29: formValues.nom,
                step30: formValues.prenom,
                step31: formValues.paysDeNaissance,
                step32: formValues.lieuDeNaissance,
                step33: formValues.situationFamiliale,
                step34: formValues.capaciteJuridique,
            });

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
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.civilite === 'Monsieur' ? 'green' : 'gray'}
                                onClick={() => handleCiviliteChange('Monsieur')}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.civilite === 'Monsieur' ? 'green.400' : 'gray.200'}
                            >
                                Monsieur
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.civilite === 'Madame' ? 'green' : 'gray'}
                                onClick={() => handleCiviliteChange('Madame')}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.civilite === 'Madame' ? 'green.400' : 'gray.200'}
                            >
                                Madame
                            </Button>
                        </HStack>
                    </Box>

                    <FormControl isInvalid={errors.dateDeNaissance}>
                        <Text fontSize="md" mb={2}>Date de naissance</Text>
                        <CustomInput
                            type="date"
                            name="dateDeNaissance"
                            value={formValues.dateDeNaissance}
                            onChange={handleInputChange}
                            mb={4}
                        />
                        <Alert status="info" mt={2} backgroundColor="blue.100" borderRadius="md">
                            <AlertIcon color="blue.400" />
                            <AlertDescription color="blue.600">Vous pouvez modifier cette information à l'étape 2.</AlertDescription>
                        </Alert>
                        {errors.dateDeNaissance && (
                            <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                <AlertIcon color="orange.400" />
                                <AlertDescription color="orange.600">Veuillez entrer une date de naissance.</AlertDescription>
                            </Alert>
                        )}
                    </FormControl>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.nom}>
                                <Text fontSize="md" mb={2}>Nom</Text>
                                <CustomInput
                                    type="text"
                                    name="nom"
                                    value={formValues.nom}
                                    onChange={handleInputChange}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Le nom doit être écrit en entier comme sur votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.prenom}>
                                <Text fontSize="md" mb={2}>Prénom</Text>
                                <CustomInput
                                    type="text"
                                    name="prenom"
                                    value={formValues.prenom}
                                    onChange={handleInputChange}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Uniquement le 1er prénom de votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>
                    </HStack>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.paysDeNaissance}>
                                <Text fontSize="md" mb={2}>Pays de naissance</Text>
                                <CustomSelect
                                    name="paysDeNaissance"
                                    value={formValues.paysDeNaissance}
                                    onChange={handleInputChange}
                                    mb={4}
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    <option value="france">France</option>
                                    <option value="usa">USA</option>
                                    {/* Add other countries as needed */}
                                </CustomSelect>
                                {errors.paysDeNaissance && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner un pays de naissance.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.lieuDeNaissance}>
                                <Text fontSize="md" mb={2}>Lieu de naissance</Text>
                                <CustomInput
                                    type="text"
                                    name="lieuDeNaissance"
                                    value={formValues.lieuDeNaissance}
                                    onChange={handleInputChange}
                                    mb={4}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Le lieu de naissance doit être orthographié comme sur votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>
                    </HStack>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.situationFamiliale}>
                                <Text fontSize="md" mb={2}>Situation familiale</Text>
                                <CustomSelect
                                    name="situationFamiliale"
                                    value={formValues.situationFamiliale}
                                    onChange={handleInputChange}
                                    mb={4}
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    <option value="single">Célibataire</option>
                                    <option value="married">Marié(e)</option>
                                    {/* Add other options as needed */}
                                </CustomSelect>
                                {errors.situationFamiliale && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une situation familiale.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.capaciteJuridique}>
                                <Text fontSize="md" mb={2}>Capacité juridique</Text>
                                <CustomSelect
                                    name="capaciteJuridique"
                                    value={formValues.capaciteJuridique}
                                    onChange={handleInputChange}
                                    mb={4}
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    <option value="full">Pleine capacité</option>
                                    <option value="limited">Capacité limitée</option>
                                    {/* Add other options as needed */}
                                </CustomSelect>
                                {errors.capaciteJuridique && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une capacité juridique.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>
                    </HStack>
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
