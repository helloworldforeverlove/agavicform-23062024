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
    CloseButton,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
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
            900: '#22543D',
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
    const [step, setStep] = useState(1);

    const handleNextStep = () => setStep(step + 1);

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="800px" mx="auto" borderWidth={1} borderRadius="md" borderColor="gray.200">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    PIÈCES JUSTIFICATIVES
                </Text>
                <Text fontSize="md" mb={4} textAlign="center">
                    Veuillez joindre les pièces justificatives ci-dessous (numérisées ou photographiées en vous servant de votre mobile). Vous pouvez revenir à tout moment pour finaliser votre parcours. Vos pièces sont sauvegardées. Poids maximum de 3Mo pour les fichiers PDF.
                </Text>
                <Box bg="green.900" color="white" px={4} py={1} borderRadius="md" mb={6} maxW="fit-content">
                    <Text>HBKJ GG</Text>
                </Box>
                <HStack spacing={6} justifyContent="center">
                    <FileUploadButton label="Pièce d'identité" icon={FaIdCard} onClick={onOpen} />
                    <FileUploadButton label="Justificatif de domicile" icon={FaHome} onClick={() => { }} />
                    <FileUploadButton label="RIB compte courant" icon={FaUniversity} onClick={() => { }} />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="green.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FcManager} w={6} h={6} />
                            <Text ml={2}>PIÈCE D'IDENTITÉ</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        {step === 1 && (
                            <VStack spacing={4} align="start">
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit être <strong>EN COULEUR</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit être <strong>ENTIÈRE</strong> (non coupée et pas de doigt visible).</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>La première pièce d'identité doit être <strong>EN COURS DE VALIDITÉ</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit comprendre le <strong>RECTO et le VERSO</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>Vous pouvez déposer un fichier unique contenant à la fois le recto et le verso de la carte nationale d'identité (CNI) en tant que "CNI recto".</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="green.100">
                                    <AlertIcon />
                                    <AlertDescription>Le passeport doit comprendre la <strong>page SIGNATURE</strong> avec la <strong>page PHOTO</strong>.</AlertDescription>
                                </Alert>
                            </VStack>
                        )}

                        {step === 2 && (
                            <VStack spacing={4} align="start">
                                <Tabs isFitted variant="enclosed">
                                    <TabList mb="1em">
                                        <Tab>PIÈCE D'IDENTITÉ</Tab>
                                        <Tab>PASSEPORT</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <HStack spacing={4}>
                                                <VStack flex={1} align="stretch">
                                                    <Text fontSize="md" mb={2}>CNI recto</Text>
                                                    <Button variant="outline" width="100%">SÉLECTIONNER MON FICHIER</Button>
                                                </VStack>
                                                <VStack flex={1} align="stretch">
                                                    <Text fontSize="md" mb={2}>CNI verso</Text>
                                                    <Button variant="outline" width="100%">SÉLECTIONNER MON FICHIER</Button>
                                                </VStack>
                                            </HStack>
                                        </TabPanel>
                                        <TabPanel>
                                            <Text fontSize="md" mb={2}>Passeport</Text>
                                            <Button variant="outline" width="100%">SÉLECTIONNER MON FICHIER</Button>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {step === 1 ? (
                            <Button colorScheme="green" onClick={handleNextStep} width="100%">J'AI LU ET COMPRIS</Button>
                        ) : (
                            <Button colorScheme="green" onClick={onClose} width="100%">FERMER</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
