import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Image,
    HStack,
    VStack,
    Link,
    Icon,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

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

const QuestionsBox: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box p={4} maxW="600px" mx="auto" bg="white" borderRadius="md" boxShadow="sm" border="1px" borderColor="gray.200">
                <HStack justify="space-between" align="center" spacing={4}>
                    <Image src="/consultant.png" alt="Consultant" boxSize="50px" borderRadius="full" />
                    <VStack align="flex-start" spacing={0}>
                        <Text fontSize="md" fontWeight="bold" color="blue.700">
                            Vous avez des questions ?
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                            Organisez un rendez-vous rapide avec l'un de nos conseillers.
                        </Text>
                    </VStack>
                    <Link href="#" color="blue.700">
                        <Icon as={ArrowForwardIcon} w={6} h={6} />
                    </Link>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default QuestionsBox;
