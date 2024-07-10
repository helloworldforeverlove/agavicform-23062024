// src/recommandation/modal/AccompagnementSurMesure.tsx
import React from 'react';
import { Box, Text, VStack, HStack, Input, Button, InputGroup, InputLeftElement, ChakraProvider, extendTheme} from '@chakra-ui/react';

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

const AccompagnementSurMesure: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <ChakraProvider theme={theme}>
            <Box
                p={5}
                textAlign="center"
                borderRadius="md"
                bg="white"
                position="relative"
            >
                <Text fontSize="md" mb={5} color="gray.500">
                    Échangez avec un conseiller privé à propos de vos projets et de nos solutions d'investissement.
                </Text>
                <VStack spacing={4}>
                    <HStack spacing={4} width="100%">
                        <Input placeholder="Camille" variant="filled" size="lg" />
                        <Input placeholder="Dupont" variant="filled" size="lg" />
                    </HStack>
                    <HStack spacing={4} width="100%">
                        <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none">
                                <Box as="span" pl={2} color="gray.500">🇫🇷</Box>
                            </InputLeftElement>
                            <Input placeholder="06 XX XX XX XX" variant="filled" />
                        </InputGroup>
                    </HStack>
                    <HStack spacing={4} width="100%" justify="center">
                        <Button variant="outline" size="lg" colorScheme="blue" flex="1" whiteSpace="normal" px={4}>
                            Continuer en autonomie
                        </Button>
                        <Button size="lg" colorScheme="blue" flex="1" whiteSpace="normal" px={4}>
                            Être accompagné par un conseiller privé
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default AccompagnementSurMesure;
