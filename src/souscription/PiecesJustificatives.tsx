import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    HStack,
    Button,
    Icon,
    useStyleConfig
} from '@chakra-ui/react';
import { FaIdCard, FaHome, FaUniversity } from 'react-icons/fa';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        blue: '#3182CE',
    },
});

const FileUploadButton: React.FC<{ label: string, icon: React.ElementType }> = ({ label, icon }) => {
    const styles = useStyleConfig("FileUploadButton");

    return (
        <Button variant="outline" sx={styles}>
            <VStack spacing={2}>
                <Icon as={icon} w={6} h={6} />
                <Text>{label}</Text>
            </VStack>
        </Button>
    );
};

const PiecesJustificatives: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="800px" mx="auto" borderWidth={1} borderRadius="md" borderColor="gray.200">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    PIÈCES JUSTIFICATIVES
                </Text>
                <Text fontSize="md" mb={4} textAlign="center">
                    Veuillez joindre les pièces justificatives ci-dessous (numérisées ou photographiées en vous servant de votre mobile). Vous pouvez revenir à tout moment pour finaliser votre parcours. Vos pièces sont sauvegardées. Poids maximum de 3Mo pour les fichiers PDF.
                </Text>
                <Box bg="blue.900" color="white" px={4} py={1} borderRadius="md" mb={6} maxW="fit-content">
                    <Text>HBKJ GG</Text>
                </Box>
                <HStack spacing={6} justifyContent="center">
                    <FileUploadButton label="Pièce d'identité" icon={FaIdCard} />
                    <FileUploadButton label="Justificatif de domicile" icon={FaHome} />
                    <FileUploadButton label="RIB compte courant" icon={FaUniversity} />
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
