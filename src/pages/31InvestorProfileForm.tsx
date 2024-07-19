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
    SimpleGrid,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useUuid } from './../context/UuidContext';

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

const CustomInput: React.FC<InputProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'yellow.500',
        color: 'yellow.500',
        boxShadow: '0 0 0 1px yellow.500',
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
        borderColor: 'yellow.500',
        color: 'yellow.500',
        boxShadow: '0 0 0 1px yellow.500',
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

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const InvestorProfileForm: React.FC = () => {
    const [formData, setFormData] = useState({
        civilite: 'Monsieur',
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
        civilite: false,
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
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const civilite = await getResponse(79);
            const lastName = await getResponse(80);
            const firstName = await getResponse(81);
            const phone = await getResponse(82);
            const profession = await getResponse(83);
            const address = await getResponse(84);
            const postalCode = await getResponse(85);
            const city = await getResponse(86);
            const country = await getResponse(87);
            const isPoliticallyExposed = await getResponse(88);
            const isUSPerson = await getResponse(89);

            setFormData({
                civilite: civilite || 'Monsieur',
                lastName: lastName || '',
                firstName: firstName || '',
                phone: phone || '',
                profession: profession || '',
                address: address || '',
                postalCode: postalCode || '',
                city: city || '',
                country: country || '',
                isPoliticallyExposed: isPoliticallyExposed || 'Non',
                isUSPerson: isUSPerson || 'Non',
            });
        };

        fetchResponse();
    }, [getResponse]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            civilite: formData.civilite === '',
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            await updateResponse(79, formData.civilite);
            await updateResponse(80, formData.lastName);
            await updateResponse(81, formData.firstName);
            await updateResponse(82, formData.phone);
            await updateResponse(83, formData.profession);
            await updateResponse(84, formData.address);
            await updateResponse(85, formData.postalCode);
            await updateResponse(86, formData.city);
            await updateResponse(87, formData.country);
            await updateResponse(88, formData.isPoliticallyExposed);
            await updateResponse(89, formData.isUSPerson);

            // Navigate to the next step
            navigate('/next-step'); // Replace with the actual next step
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quel est votre profil d'investisseur ?
                </Text>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
                            <FormControl isInvalid={errors.civilite}>
                                <Text fontSize="md" mb={2}>Civilité</Text>
                                <HStack>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formData.civilite === 'Monsieur' ? 'yellow' : 'gray'}
                                        onClick={() => setFormData({ ...formData, civilite: 'Monsieur' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formData.civilite === 'Monsieur' ? 'yellow.400' : 'gray.200'}
                                    >
                                        Monsieur
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formData.civilite === 'Madame' ? 'yellow' : 'gray'}
                                        onClick={() => setFormData({ ...formData, civilite: 'Madame' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formData.civilite === 'Madame' ? 'yellow.400' : 'gray.200'}
                                    >
                                        Madame
                                    </Button>
                                </HStack>
                            </FormControl>

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
                        </SimpleGrid>

                        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
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
                        </SimpleGrid>

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

                        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
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

                            <FormControl isInvalid={errors.country}>
                                <Text fontSize="md" mb={2}>Pays</Text>
                                <CustomSelect
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    style={{ marginBottom: 16 }}
                                >
                                    <option value="">Sélectionner</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                        </SimpleGrid>

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
            </Box>
        </ChakraProvider>
    );
};

export default InvestorProfileForm;
