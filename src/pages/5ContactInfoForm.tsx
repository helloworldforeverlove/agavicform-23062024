import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    HStack,
    FormControl,
    Alert,
    AlertIcon,
    AlertDescription,
    Input,
    useStyleConfig,
    ChakraProvider,
    extendTheme,
    InputProps,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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

const ContactInfoForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({
        email: false,
        phoneNumber: false,
    });

    const { updateResponse, getResponse } = useUuid();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponse = async () => {
            const email = await getResponse(42); // 'email' is step 42
            const phoneNumber = await getResponse(43); // 'phoneNumber' is step 43

            setFormValues({
                email: email || '',
                phoneNumber: phoneNumber || '',
            });
        };

        fetchResponse();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            email: formValues.email === '',
            phoneNumber: formValues.phoneNumber === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await updateResponse(42, formValues.email);
            await updateResponse(43, formValues.phoneNumber);

            navigate('/etes-vous-resident-fiscal-francais'); // Replace with the actual next step
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Informations de contact
                </Text>
                <VStack spacing={4} align="stretch" mx="auto">
                    <Box mt={8}>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.email}>
                                    <Text fontSize="md" mb={2}>Adresse e-mail</Text>
                                    <CustomInput
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez entrer une adresse e-mail valide.</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>
                                <FormControl isInvalid={errors.phoneNumber}>
                                    <Text fontSize="md" mb={2}>Numéro de téléphone mobile</Text>
                                    <CustomInput
                                        name="phoneNumber"
                                        placeholder="06 10 00 00 00"
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phoneNumber && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez entrer un numéro de téléphone valide.</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>
                            </HStack>
                        </VStack>
                    </Box>

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
                            colorScheme="yellow"
                            onClick={handleSubmit}
                            px={6}
                            py={6}
                            size="lg"
                        >
                            Suivant
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default ContactInfoForm;
