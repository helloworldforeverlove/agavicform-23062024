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
    CloseButton,
} from '@chakra-ui/react';
import { FaIdCard, FaHome, FaUniversity } from 'react-icons/fa';
import { FcManager } from 'react-icons/fc';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        blue: '#3182CE',
        green: {
            100: '#C6F6D5',
            400: '#48BB78',
        },
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
                width: '140px',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
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
                <Text fontSize="sm" textAlign="center" whiteSpace="normal">{label}</Text>
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

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="green.100" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FcManager} w={6} h={6} />
                            <Text ml={2}>PIÈCE D'IDENTITÉ</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        <VStack spacing={4} align="start">
                            <Alert status="warning" borderRadius="md" bg="green.100">
                                <AlertIcon />
                                <AlertDescription>La pièce d'identité doit être <strong>EN COULEUR</strong>.</AlertDescription>
                            </Alert>
                            <Alert status="warning" borderRadius="md" bg="green.100">
                                <AlertIcon />
                                <AlertDescription>La pièce d'identité doit être <strong>ENTIÈRE</strong> (non coupée et pas de doigt visible).</AlertDescription>
                            </Alert>
                            <Alert status="warning" borderRadius="md" bg="green.100">
                                <AlertIcon />
                                <AlertDescription>La pièce d'identité doit comprendre le <strong>RECTO</strong> et le <strong>VERSO</strong> (avec la page SIGNATURE pour le passeport).</AlertDescription>
                            </Alert>
                            <Alert status="warning" borderRadius="md" bg="green.100">
                                <AlertIcon />
                                <AlertDescription>La pièce d'identité doit être <strong>EN COURS DE VALIDITÉ</strong>.</AlertDescription>
                            </Alert>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={onClose} width="100%">J'AI LU ET COMPRIS</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
