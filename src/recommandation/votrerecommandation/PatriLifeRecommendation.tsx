import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
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

const PatriLifeRecommendation: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" bg="white" borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.700">
                    La recommandation PatriLife
                </Text>
                <Text fontSize="md" color="gray.700">
                    Suite à l’analyse de vos informations, nos experts vous proposent un investissement adapté à vos besoins, <Box as="span" fontWeight="bold" color="blue.700">d’ailleurs plus de 87% de nos utilisateurs ont suivi la recommandation de PatriLife.</Box>
                </Text>
            </Box>
        </ChakraProvider>
    );
};

export default PatriLifeRecommendation;
