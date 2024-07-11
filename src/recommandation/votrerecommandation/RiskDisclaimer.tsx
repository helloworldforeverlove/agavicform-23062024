import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
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

const RiskDisclaimer: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box p={4} maxW="700px" mx="auto" bg="white" borderRadius="md" boxShadow="sm" border="1px" borderColor="gray.200">
                <VStack align="flex-start" spacing={2}>
                    <Text fontSize="md" color="blue.700" fontStyle="italic">
                        "N'oubliez pas qu'investir présente un <Text as="span" fontWeight="bold">risque de perte en capital</Text>, le profil de risque doit donc être <Text as="span" fontWeight="bold">adapté à votre projet</Text>."
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="blue.700">
                        Le mot de Thomas
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Responsable conformité chez PatriLife
                    </Text>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default RiskDisclaimer;
