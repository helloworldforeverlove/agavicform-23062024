import React, { useState, ReactNode } from 'react';
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
    Select,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import { FaIdCard, FaHome, FaUniversity, FaPassport, FaMobileAlt, FaFileUpload } from 'react-icons/fa';
import { FcManager } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

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
        Section: {
            baseStyle: {
                borderRadius: 'md',
                p: 4,
                mb: 4,
            },
            variants: {
                navy: {
                    bg: 'navy',
                    color: 'white',
                },
                green: {
                    bg: 'green.100',
                    border: '1px',
                    borderColor: 'green.400',
                },
                gray: {
                    bg: 'gray.100',
                },
            },
        },
    },
});

interface SectionProps {
    title: string;
    variant: string;
    children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, variant, children }) => {
    const styles = useStyleConfig('Section', { variant });

    return (
        <Box sx={styles}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
                {title}
            </Text>
            {children}
        </Box>
    );
};

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
    const { isOpen: isRIBOpen, onOpen: onRIBOpen, onClose: onRIBClose } = useDisclosure();
    const [step, setStep] = useState(1);
    const [mobileStep, setMobileStep] = useState(1);
    const [firstUploadCompleted, setFirstUploadCompleted] = useState(false);
    const [showSecondUpload, setShowSecondUpload] = useState(false);
    const [isHosted, setIsHosted] = useState(false);
    const [initialDeposit, setInitialDeposit] = useState(5000);
    const [recurringDeposit, setRecurringDeposit] = useState(100);
    const [isRecurring, setIsRecurring] = useState(true);
    const [isReferral, setIsReferral] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNextStep = () => setStep(step + 1);

    const handleMobileNextStep = () => setMobileStep(mobileStep + 1);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            console.log('Uploaded file:', event.target.files[0]);
            setFirstUploadCompleted(true);
        }
    };

    const handleShowSecondUpload = () => {
        setShowSecondUpload(true);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        console.log('Form submitted');
        navigate('/insurance-agreement');
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
                    <FileUploadButton label="RIB compte courant" icon={FaUniversity} onClick={onRIBOpen} />
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
                    <ModalBody p={6}>
                        {mobileStep === 1 && (
                            <VStack spacing={4} align="start">
                                <Text>La facture doit être à votre nom et correspondre au numéro renseigné lors de la souscription : <strong>06 06 06 06 06</strong></Text>
                                <Text>Si vous n’avez pas de facture à votre nom, vous pouvez simplement nous fournir une attestation sur papier libre et la scanner ou la prendre en photo avec votre smartphone.</Text>
                                <Text>Voir un exemple</Text>
                                <Text>La facture doit dater de moins de 3 mois.</Text>
                                <Button mt={4} colorScheme="green" onClick={handleMobileNextStep}>Sélectionner une option</Button>
                            </VStack>
                        )}

                        {mobileStep === 2 && (
                            <VStack spacing={4} align="start">
                                <HStack spacing={4}>
                                    <Button
                                        variant={selectedOption === 'facture' ? 'solid' : 'outline'}
                                        colorScheme={selectedOption === 'facture' ? 'green' : 'gray'}
                                        onClick={() => handleOptionSelect('facture')}
                                    >
                                        Facture à mon nom
                                    </Button>
                                    <Button
                                        variant={selectedOption === 'attestation' ? 'solid' : 'outline'}
                                        colorScheme={selectedOption === 'attestation' ? 'green' : 'gray'}
                                        onClick={() => handleOptionSelect('attestation')}
                                    >
                                        Attestation
                                    </Button>
                                </HStack>
                                {selectedOption === 'facture' && (
                                    <Button as="label" variant="outline" width="100%" mt={4}>
                                        SÉLECTIONNER MON FICHIER
                                        <Input type="file" display="none" onChange={handleFileUpload} />
                                    </Button>
                                )}
                                {selectedOption === 'attestation' && (
                                    <Button as="label" variant="outline" width="100%" mt={4}>
                                        SÉLECTIONNER MON FICHIER
                                        <Input type="file" display="none" onChange={handleFileUpload} />
                                    </Button>
                                )}
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={onMobileClose} width="100%">FERMER</Button>
                    </ModalFooter>
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

            <Modal isOpen={isRIBOpen} onClose={onRIBClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="green.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FaUniversity} w={6} h={6} />
                            <Text ml={2}>RIB COMPTE COURANT</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onRIBClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        <VStack spacing={4} align="start">
                            <Text>Le RIB doit être à votre nom et comporter le logo de l’établissement bancaire.</Text>
                            <Text>Le RIB doit correspondre au compte qui sera utilisé pour votre versement initial.</Text>
                            <Text>Le RIB doit correspondre à <strong>un compte courant</strong>, il ne peut pas s'agir de votre Livret A ou autre compte sur livret.</Text>
                            <Text fontWeight="bold" mt={4}>Merci de fournir un RIB</Text>
                            <Button as="label" variant="outline" width="100%">
                                SÉLECTIONNER MON FICHIER
                                <Input type="file" display="none" onChange={handleFileUpload} />
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box p={5} maxW="800px" mx="auto">
                <Section title="SAISIE DE VOS COORDONNÉES BANCAIRES" variant="navy">
                    <FormControl id="iban">
                        <FormLabel>Votre IBAN</FormLabel>
                        <Input type="text" />
                    </FormControl>
                </Section>

                <Section title="MISE EN PLACE DE VOTRE VERSEMENT INITIAL" variant="green">
                    <FormControl id="initial-deposit">
                        <FormLabel>Montant initial</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children="€" />
                            <Input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(parseInt(e.target.value, 10))} />
                        </InputGroup>
                        <Text mt={2} color="gray.600">
                            Ce montant sera prélevé dans quelques jours, dès la validation de votre dossier. Assurez-vous d’avoir les fonds nécessaires sur ce compte au moment de la présentation du prélèvement. Pour modifier ce montant, il est indispensable de <Text as="u" color="blue.500">revoir votre projet</Text>.
                        </Text>
                    </FormControl>
                </Section>

                <Section title="MISE EN PLACE DE VOS VERSEMENTS PROGRAMMÉS" variant="navy">
                    <FormControl id="recurring-deposit-switch">
                        <FormLabel>Souhaitez-vous mettre en place des versements programmés ?</FormLabel>
                        <HStack spacing={4}>
                            <Button onClick={() => setIsRecurring(false)} variant={isRecurring ? 'outline' : 'solid'}>
                                Non
                            </Button>
                            <Button onClick={() => setIsRecurring(true)} variant={isRecurring ? 'solid' : 'outline'}>
                                Oui
                            </Button>
                        </HStack>
                    </FormControl>
                    {isRecurring && (
                        <VStack spacing={4} mt={4} align="start">
                            <FormControl id="recurring-deposit">
                                <FormLabel>Montant à prélever</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="€" />
                                    <Input type="number" value={recurringDeposit} onChange={(e) => setRecurringDeposit(parseInt(e.target.value, 10))} />
                                </InputGroup>
                            </FormControl>
                            <Text mt={2} color="gray.600">
                                Ce montant sera prélevé sur votre compte selon la fréquence et à la date que vous avez indiqués ci-dessous. Votre prélèvement programmé s'activera à l'issue d'une période de 30 jours après l'ouverture de votre contrat correspondant à la période légale de renonciation.
                            </Text>
                            <FormControl id="frequency">
                                <FormLabel>Fréquence du prélèvement</FormLabel>
                                <Select placeholder="Veuillez sélectionner">
                                    <option value="monthly">Par mois</option>
                                    <option value="quarterly">Par trimestre</option>
                                    <option value="semester">Par semestre</option>
                                    <option value="yearly">Par an</option>
                                </Select>
                            </FormControl>
                            <FormControl id="day">
                                <FormLabel>Jour du prélèvement</FormLabel>
                                <Select placeholder="Veuillez sélectionner">
                                    <option value="1">1er</option>
                                    <option value="8">8</option>
                                    <option value="20">20</option>
                                </Select>
                            </FormControl>
                        </VStack>
                    )}
                </Section>

                <Section title="VÉRIFICATIONS RÉGLEMENTAIRES" variant="navy">
                    <Text>
                        Afin de lutter contre le blanchiment de capitaux et le financement du terrorisme, nous avons besoin de quelques informations supplémentaires
                    </Text>
                    <FormControl id="source-of-funds" mt={4}>
                        <FormLabel>Origine des capitaux confiés</FormLabel>
                        <Select placeholder="Veuillez sélectionner">
                            <option value="savings">Épargne déjà constituée (dont revenus)</option>
                            <option value="property-sale">Cession de bien</option>
                            <option value="inheritance">Héritage/Donation</option>
                            <option value="professional-activity">Capitaux activité professionnelle</option>
                            <option value="gambling-winnings">Gains aux jeux</option>
                            <option value="compensation">Indemnisation/Dommages intérêts</option>
                            <option value="real-estate-sale">Vente d'actifs immobiliers</option>
                        </Select>
                    </FormControl>
                </Section>

                <Section title="PARRAINAGE OU OFFRE SPÉCIALE" variant="gray">
                    <FormControl id="referral-switch">
                        <FormLabel>Venez vous dans le cadre d’un parrainage ou d’une offre spéciale ?</FormLabel>
                        <HStack spacing={4}>
                            <Button onClick={() => setIsReferral(false)} variant={isReferral ? 'outline' : 'solid'}>
                                Non
                            </Button>
                            <Button onClick={() => setIsReferral(true)} variant={isReferral ? 'solid' : 'outline'}>
                                Oui
                            </Button>
                        </HStack>
                    </FormControl>
                    {isReferral && (
                        <FormControl id="referral-code" mt={4}>
                            <FormLabel>Renseignez votre code ci-dessous</FormLabel>
                            <Input type="text" />
                        </FormControl>
                    )}
                </Section>

                <Box mt={8} display="flex" justifyContent="space-between">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="lg"
                    >
                        Retour
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleSubmit}
                        px={6}
                        py={6}
                        size="lg"
                    >
                        Suivant
                    </Button>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default PiecesJustificatives;
