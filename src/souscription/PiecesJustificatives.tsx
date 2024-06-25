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
    Input,
    Checkbox,
} from '@chakra-ui/react';
import { FaIdCard, FaHome, FaUniversity, FaPassport, FaMobileAlt, FaFileUpload } from 'react-icons/fa';
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
            200: '#9AE6B4',
            400: '#48BB78',
            900: '#22543D',
        },
    },
    components: {
        Tabs: {
            variants: {
                enclosed: {
                    tab: {
                        _selected: {
                            bg: 'green.100',
                            color: 'green.900',
                            borderColor: 'green.200',
                            borderBottom: '2px solid',
                        },
                        _focus: {
                            boxShadow: 'none',
                        },
                    },
                },
            },
        },
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
    const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure();
    const { isOpen: isDomicileOpen, onOpen: onDomicileOpen, onClose: onDomicileClose } = useDisclosure();
    const [step, setStep] = useState(1);
    const [firstUploadCompleted, setFirstUploadCompleted] = useState(false);
    const [showSecondUpload, setShowSecondUpload] = useState(false);
    const [isHosted, setIsHosted] = useState(false);

    const handleNextStep = () => setStep(step + 1);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            // Handle file upload logic here, e.g., uploading to a server or updating state
            console.log('Uploaded file:', event.target.files[0]);
            setFirstUploadCompleted(true);
        }
    };

    const handleShowSecondUpload = () => {
        setShowSecondUpload(true);
    };

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
                    <FileUploadButton label="Facture de mobile" icon={FaMobileAlt} onClick={onMobileOpen} />
                    <FileUploadButton label="Justificatif de domicile" icon={FaHome} onClick={onDomicileOpen} />
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
                            <>
                                <VStack spacing={4} align="start">
                                    <Tabs isFitted variant="enclosed">
                                        <TabList mb="1em">
                                            <Tab _selected={{ bg: 'green.100' }}>
                                                <HStack spacing={2}>
                                                    <Icon as={FaIdCard} />
                                                    <Text>PIÈCE D'IDENTITÉ</Text>
                                                </HStack>
                                            </Tab>
                                            <Tab _selected={{ bg: 'green.100' }}>
                                                <HStack spacing={2}>
                                                    <Icon as={FaPassport} />
                                                    <Text>PASSEPORT</Text>
                                                </HStack>
                                            </Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <HStack spacing={4}>
                                                    <VStack flex={1} align="stretch">
                                                        <Text fontSize="md" mb={2}>CNI recto</Text>
                                                        <Button as="label" variant="outline" width="100%">
                                                            SÉLECTIONNER MON FICHIER
                                                            <Input type="file" display="none" onChange={handleFileUpload} />
                                                        </Button>
                                                    </VStack>
                                                    <VStack flex={1} align="stretch">
                                                        <Text fontSize="md" mb={2}>CNI verso</Text>
                                                        <Button as="label" variant="outline" width="100%">
                                                            SÉLECTIONNER MON FICHIER
                                                            <Input type="file" display="none" onChange={handleFileUpload} />
                                                        </Button>
                                                    </VStack>
                                                </HStack>
                                            </TabPanel>
                                            <TabPanel>
                                                <Text fontSize="md" mb={2}>Passeport</Text>
                                                <Button as="label" variant="outline" width="100%">
                                                    SÉLECTIONNER MON FICHIER
                                                    <Input type="file" display="none" onChange={handleFileUpload} />
                                                </Button>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </VStack>

                                {firstUploadCompleted && (
                                    <Button mt={4} colorScheme="green" onClick={handleShowSecondUpload}>Ajouter une deuxième pièce d'identité</Button>
                                )}

                                {showSecondUpload && (
                                    <VStack spacing={4} align="start" mt={6}>
                                        <Text fontSize="lg" fontWeight="bold">Deuxième Pièce d'Identité</Text>
                                        <Tabs isFitted variant="enclosed">
                                            <TabList mb="1em">
                                                <Tab _selected={{ bg: 'green.100' }}>
                                                    <HStack spacing={2}>
                                                        <Icon as={FaIdCard} />
                                                        <Text>PIÈCE D'IDENTITÉ</Text>
                                                    </HStack>
                                                </Tab>
                                                <Tab _selected={{ bg: 'green.100' }}>
                                                    <HStack spacing={2}>
                                                        <Icon as={FaPassport} />
                                                        <Text>PASSEPORT</Text>
                                                    </HStack>
                                                </Tab>
                                            </TabList>
                                            <TabPanels>
                                                <TabPanel>
                                                    <HStack spacing={4}>
                                                        <VStack flex={1} align="stretch">
                                                            <Text fontSize="md" mb={2}>CNI recto</Text>
                                                            <Button as="label" variant="outline" width="100%">
                                                                SÉLECTIONNER MON FICHIER
                                                                <Input type="file" display="none" onChange={handleFileUpload} />
                                                            </Button>
                                                        </VStack>
                                                        <VStack flex={1} align="stretch">
                                                            <Text fontSize="md" mb={2}>CNI verso</Text>
                                                            <Button as="label" variant="outline" width="100%">
                                                                SÉLECTIONNER MON FICHIER
                                                                <Input type="file" display="none" onChange={handleFileUpload} />
                                                            </Button>
                                                        </VStack>
                                                    </HStack>
                                                </TabPanel>
                                                <TabPanel>
                                                    <Text fontSize="md" mb={2}>Passeport</Text>
                                                    <Button as="label" variant="outline" width="100%">
                                                        SÉLECTIONNER MON FICHIER
                                                        <Input type="file" display="none" onChange={handleFileUpload} />
                                                    </Button>
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs>
                                    </VStack>
                                )}
                            </>
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

            <Modal isOpen={isMobileOpen} onClose={onMobileClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="green.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FaMobileAlt} w={6} h={6} />
                            <Text ml={2}>FACTURE DE MOBILE</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onMobileClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6} textAlign="center">
                        <Text fontSize="md" mb={4}>Vous avez indiqué le numéro de téléphone suivant :</Text>
                        <Text fontSize="3xl" fontWeight="bold" mb={4}>07 70 70 70 80</Text>
                        <Button colorScheme="orange" size="lg" mb={4}>C'EST LE BON NUMÉRO</Button>
                        <Text fontSize="sm">Vous pouvez le modifier sur l’étape précédente.</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDomicileOpen} onClose={onDomicileClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="green.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FaHome} w={6} h={6} />
                            <Text ml={2}>JUSTIFICATIF DE DOMICILE</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onDomicileClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        <VStack spacing={4} align="start">
                            <Text>Votre justificatif doit être à votre nom et à l'adresse indiquée lors de la souscription : <strong>3 Allée de la Croix des Hêtres, 35700 Rennes</strong></Text>
                            <Checkbox onChange={(e) => setIsHosted(e.target.checked)}>Je suis hébergé par un tiers qui ne porte pas le même nom de famille que moi</Checkbox>
                            {isHosted && (
                                <>
                                    <Text fontWeight="bold" textTransform="uppercase">Pièce d'identité de l'hébergeur</Text>
                                    <Checkbox>L'hébergeur est un résident étranger (hors communauté européenne), je dois fournir une copie de son titre de séjour et de son passeport.</Checkbox>
                                    <HStack spacing={3}>
                                        <Button variant="outline" width="100%">Carte d'identité européenne</Button>
                                        <Button variant="outline" width="100%">Passeport européen</Button>
                                    </HStack>
                                    <Text fontWeight="bold" textTransform="uppercase">Attestation rédigée datée et signée de l'hébergeur</Text>
                                    <HStack spacing={3} alignItems="center">
                                        <Icon as={FaFileUpload} />
                                        <Text>Téléchargez un exemple d’attestation d’hébergement à compléter</Text>
                                    </HStack>
                                    <Text>Attestation Hébergeur</Text>
                                    <Button as="label" variant="outline" width="100%">
                                        SÉLECTIONNER MON FICHIER
                                        <Input type="file" display="none" onChange={handleFileUpload} />
                                    </Button>
                                </>
                            )}
                            <Text fontWeight="bold">JUSTIFICATIFS DE <strong>MOINS DE 3 MOIS</strong></Text>
                            <VStack spacing={3} align="stretch" width="100%">
                                <Button variant="outline" width="100%">Facture d’énergie, internet, câble, téléphonie fixe ou mobile</Button>
                                <Button variant="outline" width="100%">Bulletin de salaire</Button>
                                <Button variant="outline" width="100%">Quittance de loyer d’un professionnel de l’immobilier</Button>
                                <Button variant="outline" width="100%">Attestation de détention d’un contrat EDF (avec QR code)</Button>
                            </VStack>
                            <Text fontWeight="bold">JUSTIFICATIFS DE <strong>MOINS DE 12 MOIS</strong></Text>
                            <VStack spacing={3} align="stretch" width="100%">
                                <Button variant="outline" width="100%">Échéancier d’un fournisseur d’énergie</Button>
                                <Button variant="outline" width="100%">Dernier avis d’impôt sur le revenu</Button>
                                <Button variant="outline" width="100%">Dernier avis de taxe d’habitation</Button>
                                <Button variant="outline" width="100%">Attestation d’un contrat d’assurance habitation</Button>
                            </VStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
