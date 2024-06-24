import React, { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    HStack,
    Button,
    Icon,
    useStyleConfig,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertDescription,
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
        orange: '#FF8C00',
    },
    components: {
        FileUploadButton: {
            baseStyle: {
                borderColor: 'gray.200',
                _hover: {
                    borderColor: 'gray.500',
                    bg: 'gray.100',
                },
                _focus: {
                    borderColor: 'gray.500',
                    boxShadow: '0 0 0 1px gray.500',
                },
                transition: 'all 0.2s',
                borderRadius: 'md',
                padding: 4,
                width: '120px',
                height: '120px',
            },
        },
    },
});

const FileUploadButton: React.FC<{ label: string, icon: React.ElementType, onClick: () => void }> = ({ label, icon, onClick }) => {
    const styles = useStyleConfig("FileUploadButton");

    return (
        <Button variant="outline" sx={styles} onClick={onClick}>
            <VStack spacing={2}>
                <Icon as={icon} w={8} h={8} />
                <Text>{label}</Text>
            </VStack>
        </Button>
    );
};

const PiecesJustificatives: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <FileUploadButton label="Pièce d'identité" icon={FaIdCard} onClick={onOpen} />
                    <FileUploadButton label="Justificatif de domicile" icon={FaHome} onClick={() => { }} />
                    <FileUploadButton label="RIB compte courant" icon={FaUniversity} onClick={() => { }} />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack>
                            <Icon as={FaIdCard} />
                            <Text>PIÈCE D'IDENTITÉ</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <Alert status="warning" mb={2}>
                            <AlertIcon />
                            <AlertDescription>La pièce d'identité doit être EN COULEUR.</AlertDescription>
                        </Alert>
                        <Alert status="warning" mb={2}>
                            <AlertIcon />
                            <AlertDescription>La pièce d'identité doit être ENTIERE (non coupée et pas de doigt visible).</AlertDescription>
                        </Alert>
                        <Alert status="warning" mb={2}>
                            <AlertIcon />
                            <AlertDescription>La pièce d'identité doit comprendre le RECTO et le VERSO (avec la page SIGNATURE pour le passeport).</AlertDescription>
                        </Alert>
                        <Alert status="warning" mb={2}>
                            <AlertIcon />
                            <AlertDescription>La pièce d'identité doit être EN COURS DE VALIDITÉ.</AlertDescription>
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" onClick={onClose}>J'AI LU ET COMPRIS</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
