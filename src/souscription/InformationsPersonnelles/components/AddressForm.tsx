import React, { useState } from 'react';
import {
    Box,
    Text,
    Input,
    FormControl,
    FormLabel,
    VStack,
    HStack,
    useStyleConfig,
    ChakraProvider,
    extendTheme,
} from '@chakra-ui/react';
import CountriesDropdown from './CountriesDropdown';

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

const CustomInput: React.FC<any> = (props) => {
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

const AddressForm: React.FC = () => {
    const [address, setAddress] = useState({
        street: '',
        additionalInfo: '',
        postalCode: '',
        city: '',
        country: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="lg" fontWeight="bold" mb={4}>Votre adresse fiscale</Text>
                <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                        <FormControl id="street">
                            <FormLabel>Numéro et nom de rue</FormLabel>
                            <CustomInput
                                name="street"
                                placeholder="Indiquez un lieu"
                                value={address.street}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl id="additionalInfo">
                            <FormLabel>Informations complémentaires</FormLabel>
                            <CustomInput
                                name="additionalInfo"
                                placeholder="FACULTATIF"
                                value={address.additionalInfo}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl id="postalCode">
                            <FormLabel>Code postal</FormLabel>
                            <CustomInput
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl id="city">
                            <FormLabel>Ville</FormLabel>
                            <CustomInput
                                name="city"
                                placeholder="Recherchez le nom de la ville"
                                value={address.city}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </HStack>
                    <FormControl id="country">
                        <FormLabel>Pays</FormLabel>
                        <CountriesDropdown
                            name="country"
                            value={address.country}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default AddressForm;
