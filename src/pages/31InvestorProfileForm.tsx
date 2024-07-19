import React, { useState, useRef } from 'react';
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
    FormControl,
    InputProps,
    SelectProps,
} from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
        yellow: {
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

interface FormData {
    civility: string;
    lastName: string;
    firstName: string;
    phone: string;
    profession: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    isPoliticallyExposed: string;
    isUSPerson: string;
}

const CustomInput: React.FC<InputProps> = (props) => {
    return (
        <Input {...props} />
    );
};

const CustomSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select {...props} />
    );
};

const InvestorProfileForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        civility: 'Monsieur',
        lastName: '',
        firstName: '',
        phone: '',
        profession: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        isPoliticallyExposed: 'Non',
        isUSPerson: 'Non',
    });

    const [errors, setErrors] = useState({
        civility: false,
        lastName: false,
        firstName: false,
        phone: false,
        profession: false,
        address: false,
        postalCode: false,
        city: false,
        country: false,
        isPoliticallyExposed: false,
        isUSPerson: false,
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            civility: formData.civility === '',
            lastName: formData.lastName === '',
            firstName: formData.firstName === '',
            phone: formData.phone === '',
            profession: formData.profession === '',
            address: formData.address === '',
            postalCode: formData.postalCode === '',
            city: formData.city === '',
            country: formData.country === '',
            isPoliticallyExposed: formData.isPoliticallyExposed === '',
            isUSPerson: formData.isUSPerson === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        } else {
            setIsAlertOpen(true);
        }
    };

    const onClose = () => setIsAlertOpen(false);

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quel est votre profil d'investisseur ?
                </Text>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontSize="md" mb={2}>Civilité</Text>
                            <HStack justifyContent="center" mb={6}>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.civility === 'Monsieur' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, civility: 'Monsieur' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.civility === 'Monsieur' ? 'yellow.400' : 'gray.200'}
                                >
                                    Monsieur
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.civility === 'Madame' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, civility: 'Madame' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.civility === 'Madame' ? 'yellow.400' : 'gray.200'}
                                >
                                    Madame
                                </Button>
                            </HStack>
                        </Box>

                        <FormControl isInvalid={errors.lastName}>
                            <Text fontSize="md" mb={2}>Nom</Text>
                            <CustomInput
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            />
                        </FormControl>

                        <FormControl isInvalid={errors.firstName}>
                            <Text fontSize="md" mb={2}>Prénom</Text>
                            <CustomInput
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            />
                        </FormControl>

                        <FormControl isInvalid={errors.phone}>
                            <Text fontSize="md" mb={2}>Téléphone</Text>
                            <CustomInput
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            />
                        </FormControl>

                        <FormControl isInvalid={errors.profession}>
                            <Text fontSize="md" mb={2}>Profession</Text>
                            <CustomInput
                                type="text"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            />
                        </FormControl>

                        <FormControl isInvalid={errors.address}>
                            <Text fontSize="md" mb={2}>Votre adresse</Text>
                            <CustomInput
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            />
                        </FormControl>

                        <HStack spacing={4} mb={4}>
                            <FormControl isInvalid={errors.postalCode}>
                                <Text fontSize="md" mb={2}>Code Postal</Text>
                                <CustomInput
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    style={{ marginBottom: 16 }}
                                />
                            </FormControl>

                            <FormControl isInvalid={errors.city}>
                                <Text fontSize="md" mb={2}>Ville</Text>
                                <CustomInput
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={{ marginBottom: 16 }}
                                />
                            </FormControl>
                        </HStack>

                        <FormControl isInvalid={errors.country}>
                            <Text fontSize="md" mb={2}>Pays</Text>
                            <CustomSelect
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                style={{ marginBottom: 16 }}
                            >
                                <option value="">Sélectionner</option>
                                <option value="France">France</option>
                                <option value="Belgium">Belgique</option>
                                <option value="Switzerland">Suisse</option>
                                <option value="Luxembourg">Luxembourg</option>
                                {/* Add other options as needed */}
                            </CustomSelect>
                        </FormControl>

                        <Box>
                            <Text fontSize="md" mb={2}>Vous ou un membre de votre famille est une Personne Politiquement exposée?</Text>
                            <HStack justifyContent="center" mb={6}>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.isPoliticallyExposed === 'Non' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, isPoliticallyExposed: 'Non' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.isPoliticallyExposed === 'Non' ? 'yellow.400' : 'gray.200'}
                                >
                                    Non
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.isPoliticallyExposed === 'Oui' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, isPoliticallyExposed: 'Oui' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.isPoliticallyExposed === 'Oui' ? 'yellow.400' : 'gray.200'}
                                >
                                    Oui
                                </Button>
                            </HStack>
                        </Box>

                        <Box>
                            <Text fontSize="md" mb={2}>Avez-vous la nationalité américaine, êtes vous détenteur de la carte verte ou êtes vous une US person au sens de la résidence fiscale?</Text>
                            <HStack justifyContent="center" mb={6}>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.isUSPerson === 'Non' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, isUSPerson: 'Non' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.isUSPerson === 'Non' ? 'yellow.400' : 'gray.200'}
                                >
                                    Non
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    colorScheme={formData.isUSPerson === 'Oui' ? 'yellow' : 'gray'}
                                    onClick={() => setFormData({ ...formData, isUSPerson: 'Oui' })}
                                    px={10}
                                    py={6}
                                    textAlign="center"
                                    _hover={{ bg: 'gray.200' }}
                                    borderColor={formData.isUSPerson === 'Oui' ? 'yellow.400' : 'gray.200'}
                                >
                                    Oui
                                </Button>
                            </HStack>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Button
                                colorScheme="gray"
                                variant="outline"
                                onClick={() => console.log('Previous step')}
                                px={6}
                                py={6}
                                size="lg"
                            >
                                Retour
                            </Button>
                            <Button
                                colorScheme="yellow"
                                type="submit"
                                px={6}
                                py={6}
                                size="lg"
                            >
                                Suivant
                            </Button>
                        </Box>
                    </VStack>
                </form>

                <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Sélection requise
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Veuillez remplir tous les champs avant de continuer.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    OK
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </ChakraProvider>
    );
};

export default InvestorProfileForm;
