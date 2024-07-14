import React, { useState, useEffect, ReactNode } from 'react';
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
    InputRightAddon,
    InputGroup,
    Checkbox,
    CheckboxProps,
    Select,
    FormControl,
    FormLabel,
    Image,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { RiPassExpiredLine } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";
import { FaPaperclip, FaIdCard, FaTimes, FaHome, FaUniversity, FaMobileAlt, FaFileUpload, FaPassport } from 'react-icons/fa';
import { FcManager } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

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
                            bg: 'yellow.100',
                            color: 'yellow.900',
                            borderColor: 'yellow.200',
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
                yellow: {
                    bg: 'yellow.100',
                    border: '1px',
                    borderColor: 'yellow.400',
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
    variant?: string;
    children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, variant, children }) => {
    const styles = useStyleConfig('Section', { variant });

    return (
        <Box sx={styles}>
            <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">
                {title}
            </Text>
            {children}
        </Box>
    );
};

const CustomCheckbox = (props: CheckboxProps) => {
    const checkedColor = useColorModeValue("yellow.300", "yellow.100");

    return (
        <Checkbox
            {...props}
            colorScheme="yellow"
            iconColor="white"
            borderColor="gray.300"
            _checked={{
                bg: checkedColor,
                borderColor: checkedColor,
            }}
        />
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
    // eslint-disable-next-line
    const [firstUploadCompleted, setFirstUploadCompleted] = useState(false);
    const [showSecondUpload, setShowSecondUpload] = useState(false);
    const [isHosted, setIsHosted] = useState(false);
    const [isRecurring, setIsRecurring] = useState(true);
    const [isReferral, setIsReferral] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
    const [selectedDomicile, setSelectedDomicile] = useState<string | null>(null);
    const [ribUrl, setRibUrl] = useState<string | null>(null);
    const [mobileUrl, setMobileUrl] = useState<string | null>(null);
    const [domicileUrl, setDomicileUrl] = useState<string | null>(null);
    const [passportUrl, setPassportUrl] = useState<string | null>(null);
    const [cniRectoUrl, setCniRectoUrl] = useState<string | null>(null);
    const [cniVersoUrl, setCniVersoUrl] = useState<string | null>(null);
    const [identityEuropeRectoUrl, setIdentityEuropeRectoUrl] = useState<string | null>(null);
    const [identityEuropeVersoUrl, setIdentityEuropeVersoUrl] = useState<string | null>(null);
    const [passportEuropeUrl, setPassportEuropeUrl] = useState<string | null>(null);
    const [attestationHebergementUrl, setAttestationHebergementUrl] = useState<string | null>(null);
    const { isOpen: isExampleOpen, onOpen: onExampleOpen, onClose: onExampleClose } = useDisclosure();
    const navigate = useNavigate();
    const { uuid, getResponse } = useUuid();

    const handleNextStep = () => setStep(step + 1);

    const handleMobileNextStep = () => setMobileStep(mobileStep + 1);

    const handleMobileFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('facture-de-mobile') // Assurez-vous que ce bucket existe dans votre Supabase
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('facture-de-mobile') // Assurez-vous que ce bucket existe dans votre Supabase
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setMobileUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleRIBFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('rib-compte-courant')
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('rib-compte-courant')
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setRibUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleDomicileFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('justificatif-domicile') // Assurez-vous que ce bucket existe dans votre Supabase
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('justificatif-domicile') // Assurez-vous que ce bucket existe dans votre Supabase
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setDomicileUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleAttestationHebergementFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('attestation-hebergement')
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('attestation-hebergement')
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setAttestationHebergementUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleIdentityEuropeRectoFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('identity-europe-recto')
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('identity-europe-recto')
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setIdentityEuropeRectoUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleIdentityEuropeVersoFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('identity-europe-verso')
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('identity-europe-verso')
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setIdentityEuropeVersoUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handlePassportEuropeFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('passport-europe')
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('passport-europe')
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setPassportEuropeUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handlePassportFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('passeport') // Assurez-vous que ce bucket existe dans votre Supabase
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('passeport') // Assurez-vous que ce bucket existe dans votre Supabase
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setPassportUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleCniRectoFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('cni-recto') // Assurez-vous que ce bucket existe dans votre Supabase
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('cni-recto') // Assurez-vous que ce bucket existe dans votre Supabase
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setCniRectoUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleCniVersoFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const { error } = await supabase.storage
                .from('cni-verso') // Assurez-vous que ce bucket existe dans votre Supabase
                .upload(`public/${uuid}/${uniqueFileName}`, file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
                const { data } = supabase.storage
                    .from('cni-verso') // Assurez-vous que ce bucket existe dans votre Supabase
                    .getPublicUrl(`public/${uuid}/${uniqueFileName}`);

                if (data) {
                    setCniVersoUrl(data.publicUrl);
                } else {
                    console.error('Error getting public URL');
                }
            }
        }
    };

    const handleShowSecondUpload = () => {
        setShowSecondUpload(true);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleIdentitySelect = (option: string) => {
        setSelectedIdentity(option);
    };

    const handleDomicileSelect = (option: string) => {
        setSelectedDomicile(option);
    };

    const handleSubmit = async () => {
        console.log('Form submitted');
        const { error } = await supabase
            .from('form_responses')
            .update({
                step51: formValues.step51,
                step52: formValues.step52,
                step53: formValues.step53,
                step54: formValues.step54,
                step55: formValues.step55,
                step56: formValues.step56,
                step57: formValues.step57,
                step58: isReferral,
                step59: formValues.step59,
                step60: formValues.step60,
                step61: formValues.step61,
                step62: formValues.step62,
                step63: formValues.step63,
                step64: formValues.step64,
                step65: selectedOption,
                step66: selectedIdentity,
                step67: selectedDomicile,
                step68: ribUrl,
                step69: mobileUrl,
                step70: passportUrl,
                step71: cniRectoUrl,
                step72: cniVersoUrl,
                step75: domicileUrl,
                step76: passportEuropeUrl,
                step77: identityEuropeRectoUrl,
                step78: identityEuropeVersoUrl,
            })
            .eq('id', uuid);

        if (error) {
            console.error('Error updating form responses:', error);
        } else {
            navigate('/insurance-agreement');
        }
    };

    useEffect(() => {
        const fetchResponse = async () => {
            const step51 = await getResponse(51);
            const step52 = await getResponse(52);
            const step53 = await getResponse(53);
            const step54 = await getResponse(54);
            const step55 = await getResponse(55);
            const step56 = await getResponse(56);
            const step57 = await getResponse(57);
            const step58 = await getResponse(58);
            const step59 = await getResponse(59);
            const step60 = await getResponse(60);
            const step61 = await getResponse(61);
            const step62 = await getResponse(62);
            const step63 = await getResponse(63);
            const step64 = await getResponse(64);
            const step65 = await getResponse(65);
            const step66 = await getResponse(66);
            const step67 = await getResponse(67);
            const step68 = await getResponse(68);
            const step69 = await getResponse(69);
            const step70 = await getResponse(70);
            const step71 = await getResponse(71);
            const step72 = await getResponse(72);
            const step75 = await getResponse(75);
            const step76 = await getResponse(76); // Ajout de ces lignes
            const step77 = await getResponse(77); // Ajout de ces lignes
            const step78 = await getResponse(78); // Ajout de ces lignes

            setFormValues({
                step51: step51 || '',
                step52: step52 || '',
                step53: step53 || '',
                step54: step54 || '',
                step55: step55 || '',
                step56: step56 || '',
                step57: step57 || '',
                step58: step58 || '',
                step59: step59 || '',
                step60: step60 || '',
                step61: step61 || '',
                step62: step62 || '',
                step63: step63 || '',
                step64: step64 || '',
                step65: step65 || '',
                step66: step66 || '',
                step67: step67 || '',
                step68: step68 || '',
                step69: step69 || '',
                step70: step70 || '',
                step71: step71 || '',
                step72: step72 || '',
                step75: step75 || '',
                step76: step76 || '',
                step77: step77 || '',
                step78: step78 || '',
            });
            setSelectedOption(step65 || '');
            setSelectedIdentity(step66 || '');
            setSelectedDomicile(step67 || '');
            setRibUrl(step68 || '');
            setMobileUrl(step69 || '');
            setPassportUrl(step70 || '');
            setCniRectoUrl(step71 || '');
            setCniVersoUrl(step72 || '');
            setDomicileUrl(step75 || '');
            setPassportEuropeUrl(step76 || ''); // Ajout de ces lignes
            setIdentityEuropeRectoUrl(step77 || ''); // Ajout de ces lignes
            setIdentityEuropeVersoUrl(step78 || ''); // Ajout de ces lignes
            setIsReferral(step58 === 'true');
        };

        fetchResponse();
    }, [getResponse]);

    const formatNumberWithSpaces = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const [formValues, setFormValues] = useState({
        step51: '',
        step52: '',
        step53: '',
        step54: '',
        step55: '',
        step56: '',
        step57: '',
        step58: '',
        step59: '',
        step60: '',
        step61: '',
        step62: '',
        step63: '',
        step64: '',
        step65: '',
        step66: '',
        step67: '',
        step68: '',
        step69: '',
        step70: '',
        step71: '',
        step72: '',
        step75: '',
        step76: '',
        step77: '',
        step78: '',
    });

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={4} />
            <Box p={5} maxW="1000px" mx="auto" borderWidth={1} borderRadius="md" borderColor="gray.200">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    PIÈCES JUSTIFICATIVES
                </Text>
                <Text fontSize="md" mb={4} textAlign="center">
                    Veuillez joindre les pièces justificatives ci-dessous (numérisées ou photographiées en vous servant de votre mobile). Vous pouvez revenir à tout moment pour finaliser votre parcours. Vos pièces sont sauvegardées. Poids maximum de 3Mo pour les fichiers PDF.
                </Text>
                <Box bg="yellow.900" color="white" px={4} py={1} borderRadius="md" mb={6} maxW="fit-content" mx="auto">
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
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="yellow.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FcManager} w={6} h={6} />
                            <Text ml={2}>PIÈCE D'IDENTITÉ</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        {step === 1 && (
                            <VStack spacing={4} align="start">
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit être <strong>EN COULEUR</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit être <strong>ENTIÈRE</strong> (non coupée et pas de doigt visible).</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>La première pièce d'identité doit être <strong>EN COURS DE VALIDITÉ</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>La pièce d'identité doit comprendre le <strong>RECTO et le VERSO</strong>.</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>Vous pouvez déposer un fichier unique contenant à la fois le recto et le verso de la carte nationale d'identité (CNI) en tant que "CNI recto".</AlertDescription>
                                </Alert>
                                <Alert status="info" borderRadius="md" bg="yellow.100">
                                    <AlertIcon />
                                    <AlertDescription>Le passeport doit comprendre la <strong>page SIGNATURE</strong> avec la <strong>page PHOTO</strong>.</AlertDescription>
                                </Alert>
                            </VStack>
                        )}

                        {step === 2 && (
                            <>
                                <VStack spacing={4} align="start">
                                    <Tabs isFitted variant="enclosed" index={selectedIdentity === 'piece_identite' ? 0 : 1}>
                                        <TabList mb="1em">
                                            <Tab _selected={{ bg: 'yellow.100' }} onClick={() => handleIdentitySelect('piece_identite')}>
                                                <HStack spacing={2}>
                                                    <Icon as={FaIdCard} />
                                                    <Text>PIÈCE D'IDENTITÉ</Text>
                                                </HStack>
                                            </Tab>
                                            <Tab _selected={{ bg: 'yellow.100' }} onClick={() => handleIdentitySelect('passeport')}>
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
                                                            <Input type="file" display="none" onChange={handleCniRectoFileUpload} />
                                                        </Button>
                                                        {cniRectoUrl && (
                                                            <>
                                                                <FormControl display="none" id="cni-recto-url" mt={4}>
                                                                    <FormLabel textAlign="center">URL du fichier CNI recto</FormLabel>
                                                                    <Input
                                                                        type="text"
                                                                        value={cniRectoUrl}
                                                                        isReadOnly
                                                                        textAlign="center"
                                                                        borderColor="yellow.400"
                                                                        color="yellow.500"
                                                                    />
                                                                </FormControl>
                                                                <Box mt={4}>
                                                                    <Image src={cniRectoUrl} alt="CNI Recto" />
                                                                </Box>
                                                            </>
                                                        )}
                                                    </VStack>
                                                    <VStack flex={1} align="stretch">
                                                        <Text fontSize="md" mb={2}>CNI verso</Text>
                                                        <Button as="label" variant="outline" width="100%">
                                                            SÉLECTIONNER MON FICHIER
                                                            <Input type="file" display="none" onChange={handleCniVersoFileUpload} />
                                                        </Button>
                                                        {cniVersoUrl && (
                                                            <>
                                                                <FormControl display="none" id="cni-verso-url" mt={4}>
                                                                    <FormLabel textAlign="center">URL du fichier CNI verso</FormLabel>
                                                                    <Input
                                                                        type="text"
                                                                        value={cniVersoUrl}
                                                                        isReadOnly
                                                                        textAlign="center"
                                                                        borderColor="yellow.400"
                                                                        color="yellow.500"
                                                                    />
                                                                </FormControl>
                                                                <Box mt={4}>
                                                                    <Image src={cniVersoUrl} alt="CNI Verso" />
                                                                </Box>
                                                            </>
                                                        )}
                                                    </VStack>
                                                </HStack>
                                            </TabPanel>
                                            <TabPanel>
                                                <Text fontSize="md" mb={2}>Passeport</Text>
                                                <Button as="label" variant="outline" width="100%">
                                                    SÉLECTIONNER MON FICHIER
                                                    <Input type="file" display="none" onChange={handlePassportFileUpload} />
                                                </Button>
                                                {passportUrl && (
                                                    <>
                                                        <FormControl display="none" id="passport-url" mt={4}>
                                                            <FormLabel textAlign="center">URL du fichier de passeport</FormLabel>
                                                            <Input
                                                                type="text"
                                                                value={passportUrl}
                                                                isReadOnly
                                                                textAlign="center"
                                                                borderColor="yellow.400"
                                                                color="yellow.500"
                                                            />
                                                        </FormControl>
                                                        <Box mt={4}>
                                                            <Image src={passportUrl} alt="Passeport" />
                                                        </Box>
                                                    </>
                                                )}
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </VStack>

                                {firstUploadCompleted && (
                                    <Button mt={4} colorScheme="yellow" onClick={handleShowSecondUpload}>Ajouter une deuxième pièce d'identité</Button>
                                )}

                                {showSecondUpload && (
                                    <VStack spacing={4} align="start" mt={6}>
                                        <Text fontSize="lg" fontWeight="bold">Deuxième Pièce d'Identité</Text>
                                        <Tabs isFitted variant="enclosed">
                                            <TabList mb="1em">
                                                <Tab _selected={{ bg: 'yellow.100' }}>
                                                    <HStack spacing={2}>
                                                        <Icon as={FaIdCard} />
                                                        <Text>PIÈCE D'IDENTITÉ</Text>
                                                    </HStack>
                                                </Tab>
                                                <Tab _selected={{ bg: 'yellow.100' }}>
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
                                                                <Input type="file" display="none" onChange={handleCniRectoFileUpload} />
                                                            </Button>
                                                        </VStack>
                                                        <VStack flex={1} align="stretch">
                                                            <Text fontSize="md" mb={2}>CNI verso</Text>
                                                            <Button as="label" variant="outline" width="100%">
                                                                SÉLECTIONNER MON FICHIER
                                                                <Input type="file" display="none" onChange={handleCniVersoFileUpload} />
                                                            </Button>
                                                        </VStack>
                                                    </HStack>
                                                </TabPanel>
                                                <TabPanel>
                                                    <Text fontSize="md" mb={2}>Passeport</Text>
                                                    <Button as="label" variant="outline" width="100%">
                                                        SÉLECTIONNER MON FICHIER
                                                        <Input type="file" display="none" onChange={handlePassportFileUpload} />
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
                            <Button colorScheme="yellow" onClick={handleNextStep} width="100%">J'AI LU ET COMPRIS</Button>
                        ) : (
                            <Button colorScheme="yellow" onClick={onClose} width="100%">FERMER</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isMobileOpen} onClose={onMobileClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="yellow.900" color="white" borderTopRadius="md">
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
                                <Button mt={4} colorScheme="yellow" onClick={handleMobileNextStep}>Sélectionner une option</Button>
                            </VStack>
                        )}

                        {mobileStep === 2 && (
                            <VStack spacing={4} align="start">
                                <HStack spacing={4}>
                                    <Button
                                        variant="outline"
                                        colorScheme={selectedOption === 'facture' ? 'yellow' : 'gray'}
                                        borderColor={selectedOption === 'facture' ? 'yellow.400' : 'gray.200'}
                                        onClick={() => handleOptionSelect('facture')}
                                        px={10}
                                        py={6}
                                        size="lg"
                                        _hover={{ bg: 'gray.200' }}
                                    >
                                        Facture à mon nom
                                    </Button>
                                    <Button
                                        variant="outline"
                                        colorScheme={selectedOption === 'attestation' ? 'yellow' : 'gray'}
                                        borderColor={selectedOption === 'attestation' ? 'yellow.400' : 'gray.200'}
                                        onClick={() => handleOptionSelect('attestation')}
                                        px={10}
                                        py={6}
                                        size="lg"
                                        _hover={{ bg: 'gray.200' }}
                                    >
                                        Attestation
                                    </Button>
                                </HStack>
                                {selectedOption === 'facture' && (
                                    <Button as="label" variant="outline" width="100%" mt={4}>
                                        SÉLECTIONNER MON FICHIER
                                        <Input type="file" display="none" onChange={handleMobileFileUpload} />
                                    </Button>
                                )}
                                {selectedOption === 'attestation' && (
                                    <Button as="label" variant="outline" width="100%" mt={4}>
                                        SÉLECTIONNER MON FICHIER
                                        <Input type="file" display="none" onChange={handleMobileFileUpload} />
                                    </Button>
                                )}
                                {mobileUrl && (
                                    <>
                                        <FormControl display="none" id="mobile-url" mt={4}>
                                            <FormLabel textAlign="center">URL du fichier mobile</FormLabel>
                                            <Input
                                                type="text"
                                                value={mobileUrl}
                                                isReadOnly
                                                textAlign="center"
                                                borderColor="yellow.400"
                                                color="yellow.500"
                                            />
                                        </FormControl>
                                        <Box mt={4}>
                                            <Image src={mobileUrl} alt="Facture Mobile" />
                                        </Box>
                                    </>
                                )}
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="yellow" onClick={onMobileClose} width="100%">FERMER</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDomicileOpen} onClose={onDomicileClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="yellow.900" color="white" borderTopRadius="md">
                        <HStack>
                            <Icon as={FaHome} w={6} h={6} />
                            <Text ml={2}>JUSTIFICATIF DE DOMICILE</Text>
                        </HStack>
                        <CloseButton color="white" onClick={onDomicileClose} size="lg" />
                    </ModalHeader>
                    <ModalBody p={6}>
                        <VStack spacing={4} align="center" width="100%">
                            <Button as="label" variant="outline" width="60%">
                                SÉLECTIONNER MON FICHIER
                                <Input type="file" display="none" onChange={handleDomicileFileUpload} />
                            </Button>
                            <Text textAlign="center">
                                Votre justificatif doit être à votre nom et à l'adresse indiquée lors de la souscription : <strong>3 Allée de la Croix des Hêtres, 35700 Rennes</strong>
                            </Text>
                            <CustomCheckbox
                                borderRadius={5}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsHosted(e.target.checked)}
                            >
                                Je suis hébergé par un tiers qui ne porte pas le même nom de famille que moi
                            </CustomCheckbox>
                            {isHosted && (
                                <VStack spacing={4} align="center" width="100%">
                                    <Text fontWeight="bold" textTransform="uppercase" textAlign="center">Pièce d'identité de l'hébergeur</Text>
                                    <Checkbox>L'hébergeur est un résident étranger (hors communauté européenne), je dois fournir une copie de son titre de séjour et de son passeport.</Checkbox>

                                    <Text fontWeight="bold" textTransform="uppercase" mt={4} textAlign="center">Ma Pièce d'identité</Text>
                                    <VStack spacing={4} align="stretch" width="100%">
                                        <Button as="label" variant="outline" width="60%" mx="auto">
                                            <Icon as={FcViewDetails} /> CNI RECTO
                                            <Input type="file" display="none" onChange={handleIdentityEuropeRectoFileUpload} />
                                        </Button>
                                        {identityEuropeRectoUrl && (
                                            <>
                                                <FormControl display="none" id="cni-recto-url" mt={4}>
                                                    <FormLabel textAlign="center">URL de la CNI recto</FormLabel>
                                                    <Input
                                                        type="text"
                                                        value={identityEuropeRectoUrl}
                                                        isReadOnly
                                                        textAlign="center"
                                                        borderColor="yellow.400"
                                                        color="yellow.500"
                                                    />
                                                </FormControl>
                                                <Box mt={4} mx="auto">
                                                    <Image src={identityEuropeRectoUrl} alt="Carte d'identité européenne recto" />
                                                </Box>
                                            </>
                                        )}
                                        <Button as="label" variant="outline" width="60%" mx="auto">
                                            <Icon as={FcViewDetails} /> CNI VERSO
                                            <Input type="file" display="none" onChange={handleIdentityEuropeVersoFileUpload} />
                                        </Button>
                                        {identityEuropeVersoUrl && (
                                            <>
                                                <FormControl display="none" id="cni-verso-url" mt={4}>
                                                    <FormLabel textAlign="center">URL de la CNI verso</FormLabel>
                                                    <Input
                                                        type="text"
                                                        value={identityEuropeVersoUrl}
                                                        isReadOnly
                                                        textAlign="center"
                                                        borderColor="yellow.400"
                                                        color="yellow.500"
                                                    />
                                                </FormControl>
                                                <Box mt={4} mx="auto">
                                                    <Image src={identityEuropeVersoUrl} alt="Carte d'identité européenne verso" />
                                                </Box>
                                            </>
                                        )}
                                    </VStack>

                                    <Text fontWeight="bold" textTransform="uppercase" mt={4} textAlign="center">Mon passeport</Text>
                                    <VStack spacing={4} align="stretch" width="100%">
                                        <Button as="label" variant="outline" width="60%" mx="auto">
                                            <Icon color="red" as={RiPassExpiredLine} /> PASSEPORT
                                            <Input type="file" display="none" onChange={handlePassportEuropeFileUpload} />
                                        </Button>
                                        {passportEuropeUrl && (
                                            <>
                                                <FormControl display="none" id="passport-europe-url" mt={4}>
                                                    <FormLabel textAlign="center">URL du passeport européen</FormLabel>
                                                    <Input
                                                        type="text"
                                                        value={passportEuropeUrl}
                                                        isReadOnly
                                                        textAlign="center"
                                                        borderColor="yellow.400"
                                                        color="yellow.500"
                                                    />
                                                </FormControl>
                                                <Box mt={4} mx="auto">
                                                    <Image src={passportEuropeUrl} alt="Passeport européen" />
                                                </Box>
                                            </>
                                        )}
                                    </VStack>

                                    <Text fontWeight="bold" textTransform="uppercase" mt={4} textAlign="center">Attestation rédigée datée et signée de l'hébergeur</Text>
                                    <Button as="label" variant="outline" width="60%" mx="auto" mt={4}>
                                        <Icon color="blue.200" as={FaPaperclip} /> MON ATTESTATION D'HEBERGEMENT
                                        <Input type="file" display="none" onChange={handleAttestationHebergementFileUpload} />
                                    </Button>
                                    <HStack p={3} borderRadius={5} bgColor="yellow.100" spacing={3} alignItems="center" justifyContent="center">
                                        <Icon color="yellow.400" as={FaFileUpload} />
                                        <Text cursor="pointer" color="blue.500" onClick={onExampleOpen} _hover={{ textDecoration: 'underline' }}>Téléchargez un exemple d’attestation d’hébergement à compléter</Text>
                                    </HStack>
                                    {attestationHebergementUrl && (
                                        <>
                                            <FormControl display="none" id="attestation-hebergement-url" mt={4}>
                                                <FormLabel textAlign="center">URL de l'attestation d'hébergement</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={attestationHebergementUrl}
                                                    isReadOnly
                                                    textAlign="center"
                                                    borderColor="yellow.400"
                                                    color="yellow.500"
                                                />
                                            </FormControl>
                                            <Box mt={4} mx="auto">
                                                <Image src={attestationHebergementUrl} alt="Attestation d'hébergement" />
                                            </Box>
                                        </>
                                    )}
                                    
                                </VStack>
                            )}
                            <Text fontWeight="bold" textAlign="center">JUSTIFICATIFS DE <strong>MOINS DE 3 MOIS</strong></Text>
                            <VStack spacing={3} align="stretch" width="100%">
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'energie' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('energie')}
                                    borderColor={selectedDomicile === 'energie' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'energie' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Facture d’énergie, internet, câble, téléphonie fixe ou mobile
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'bulletin_salaire' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('bulletin_salaire')}
                                    borderColor={selectedDomicile === 'bulletin_salaire' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'bulletin_salaire' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Bulletin de salaire
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'quittance_loyer' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('quittance_loyer')}
                                    borderColor={selectedDomicile === 'quittance_loyer' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'quittance_loyer' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Quittance de loyer d’un professionnel de l’immobilier
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'contrat_edf' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('contrat_edf')}
                                    borderColor={selectedDomicile === 'contrat_edf' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'contrat_edf' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Attestation de détention d’un contrat EDF (avec QR code)
                                </Button>
                            </VStack>
                            <Text fontWeight="bold" textAlign="center">JUSTIFICATIFS DE <strong>MOINS DE 12 MOIS</strong></Text>
                            <VStack spacing={3} align="stretch" width="100%">
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'echeancier_energie' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('echeancier_energie')}
                                    borderColor={selectedDomicile === 'echeancier_energie' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'echeancier_energie' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Échéancier d’un fournisseur d’énergie
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'impot_revenu' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('impot_revenu')}
                                    borderColor={selectedDomicile === 'impot_revenu' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'impot_revenu' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Dernier avis d’impôt sur le revenu
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'taxe_habitation' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('taxe_habitation')}
                                    borderColor={selectedDomicile === 'taxe_habitation' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'taxe_habitation' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Dernier avis de taxe d’habitation
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme={selectedDomicile === 'assurance_habitation' ? 'yellow' : 'gray'}
                                    onClick={() => handleDomicileSelect('assurance_habitation')}
                                    borderColor={selectedDomicile === 'assurance_habitation' ? 'yellow.400' : 'gray.200'}
                                    color={selectedDomicile === 'assurance_habitation' ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: 'yellow.300', color: 'yellow.500' }}
                                    bg="transparent"
                                >
                                    Attestation d’un contrat d’assurance habitation
                                </Button>
                            </VStack>
                            {domicileUrl && (
                                <VStack>
                                    <FormControl display="none" id="domicile-url" mt={4}>
                                        <FormLabel textAlign="center">URL du fichier de domicile</FormLabel>
                                        <Input
                                            type="text"
                                            value={domicileUrl}
                                            isReadOnly
                                            textAlign="center"
                                            borderColor="yellow.400"
                                            color="yellow.500"
                                        />
                                    </FormControl>
                                    <img src={domicileUrl} alt="Justificatif de domicile" width="100%" />
                                </VStack>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isRIBOpen} onClose={onRIBClose} size="xl">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center" bg="yellow.900" color="white" borderTopRadius="md">
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
                                <Input type="file" display="none" onChange={handleRIBFileUpload} />
                            </Button>
                            {ribUrl && (
                                <>
                                    <FormControl display="none" id="rib-url" mt={4}>
                                        <FormLabel textAlign="center">URL du fichier RIB</FormLabel>
                                        <Input
                                            type="text"
                                            value={ribUrl}
                                            isReadOnly
                                            textAlign="center"
                                            borderColor="yellow.400"
                                            color="yellow.500"
                                        />
                                    </FormControl>
                                    <Box mt={4}>
                                        <Image src={ribUrl} alt="RIB Compte Courant" />
                                    </Box>
                                </>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box p={5} maxW="1000px" mx="auto">
                <Section title="SAISIE DE VOS COORDONNÉES BANCAIRES">
                    <FormControl id="iban">
                        <FormLabel textAlign="center">Votre IBAN</FormLabel>
                        <Input
                            type="text"
                            value={formValues.step51}
                            onChange={(e) => setFormValues({ ...formValues, step51: e.target.value })}
                            textAlign="center"
                            borderColor={formValues.step51 ? 'yellow.400' : 'gray.200'}
                            _hover={{ borderColor: formValues.step51 ? 'yellow.500' : 'gray.300' }}
                            color={formValues.step51 ? 'yellow.500' : 'inherit'}
                        />
                    </FormControl>
                </Section>

                <Section title="MISE EN PLACE DE VOTRE VERSEMENT INITIAL">
                    <FormControl id="initial-deposit">
                        <FormLabel textAlign="center">Montant initial</FormLabel>
                        <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                            <InputGroup size="lg" width="auto">
                                <Input
                                    type="text" // Change input type to text to format with spaces
                                    min={0}
                                    value={formValues.step52 ? formatNumberWithSpaces(Number(formValues.step52)) : ''}
                                    onChange={(e) => setFormValues({ ...formValues, step52: e.target.value.replace(/\s+/g, '') })}
                                    placeholder="Entrez une valeur"
                                    size="lg"
                                    textAlign="center"
                                    borderColor={formValues.step52 ? 'yellow.400' : 'gray.200'}
                                    _hover={{ borderColor: formValues.step52 ? 'yellow.500' : 'gray.300' }}
                                    color={formValues.step52 ? 'yellow.500' : 'inherit'}
                                />
                                <InputRightAddon children="€" />
                            </InputGroup>
                        </Box>
                        <Text mt={2} color="gray.600" textAlign="center">
                            Ce montant sera prélevé dans quelques jours, dès la validation de votre dossier. Assurez-vous d’avoir les fonds nécessaires sur ce compte au moment de la présentation du prélèvement. Pour modifier ce montant, il est indispensable de <Text as="u" color="blue.500">revoir votre projet</Text>.
                        </Text>
                    </FormControl>
                </Section>

                <Section title="MISE EN PLACE DE VOS VERSEMENTS PROGRAMMÉS">
                    <FormControl id="recurring-deposit-switch">
                        <FormLabel textAlign="center">Souhaitez-vous mettre en place des versements programmés ?</FormLabel>
                        <HStack justifyContent="center" spacing={4}>
                            <Button
                                variant="outline"
                                colorScheme={!isRecurring ? 'yellow' : 'gray'}
                                borderColor={!isRecurring ? 'yellow.400' : 'gray.200'}
                                onClick={() => setIsRecurring(false)}
                                px={10}
                                py={6}
                                size="lg"
                                _hover={{ bg: 'gray.200' }}
                            >
                                Non
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme={isRecurring ? 'yellow' : 'gray'}
                                borderColor={isRecurring ? 'yellow.400' : 'gray.200'}
                                onClick={() => setIsRecurring(true)}
                                px={10}
                                py={6}
                                size="lg"
                                _hover={{ bg: 'gray.200' }}
                            >
                                Oui
                            </Button>
                        </HStack>
                    </FormControl>
                    {isRecurring && (
                        <VStack spacing={4} mt={4}>
                            <FormControl id="recurring-deposit">
                                <FormLabel textAlign="center">Montant à prélever</FormLabel>
                                <Box justifyContent="center" mb={6} maxWidth={400} mx="auto">
                                    <InputGroup size="lg" width="auto">
                                        <Input
                                            type="text" // Change input type to text to format with spaces
                                            min={0}
                                            value={formValues.step53 ? formatNumberWithSpaces(Number(formValues.step53)) : ''}
                                            onChange={(e) => setFormValues({ ...formValues, step53: e.target.value.replace(/\s+/g, '') })}
                                            placeholder="Entrez une valeur"
                                            size="lg"
                                            textAlign="center"
                                            borderColor={formValues.step53 ? 'yellow.400' : 'gray.200'}
                                            _hover={{ borderColor: formValues.step53 ? 'yellow.500' : 'gray.300' }}
                                            color={formValues.step53 ? 'yellow.500' : 'inherit'}
                                        />
                                        <InputRightAddon children="€" />
                                    </InputGroup>
                                </Box>
                            </FormControl>
                            <Text mt={2} color="gray.600" textAlign="center">
                                Ce montant sera prélevé sur votre compte selon la fréquence et à la date que vous avez indiqués ci-dessous. Votre prélèvement programmé s'activera à l'issue d'une période de 30 jours après l'ouverture de votre contrat correspondant à la période légale de renonciation.
                            </Text>
                            <FormControl id="frequency">
                                <FormLabel textAlign="center">Fréquence du prélèvement</FormLabel>
                                <Select
                                    placeholder="Veuillez sélectionner"
                                    value={formValues.step54}
                                    onChange={(e) => setFormValues({ ...formValues, step54: e.target.value })}
                                    borderColor={formValues.step54 ? 'yellow.400' : 'gray.200'}
                                    color={formValues.step54 ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: formValues.step54 ? 'yellow.500' : 'gray.300' }}
                                >
                                    <option value="monthly">Par mois</option>
                                    <option value="quarterly">Par trimestre</option>
                                    <option value="semester">Par semestre</option>
                                    <option value="yearly">Par an</option>
                                </Select>
                            </FormControl>
                            <FormControl id="day">
                                <FormLabel textAlign="center">Jour du prélèvement</FormLabel>
                                <Select
                                    placeholder="Veuillez sélectionner"
                                    value={formValues.step55}
                                    onChange={(e) => setFormValues({ ...formValues, step55: e.target.value })}
                                    borderColor={formValues.step55 ? 'yellow.400' : 'gray.200'}
                                    color={formValues.step55 ? 'yellow.500' : 'inherit'}
                                    _hover={{ borderColor: formValues.step55 ? 'yellow.500' : 'gray.300' }}
                                >
                                    <option value="1">1er</option>
                                    <option value="8">8</option>
                                    <option value="20">20</option>
                                </Select>
                            </FormControl>
                        </VStack>
                    )}
                </Section>

                <Section title="VÉRIFICATIONS RÉGLEMENTAIRES">
                    <Text textAlign="center">
                        Afin de lutter contre le blanchiment de capitaux et le financement du terrorisme, nous avons besoin de quelques informations supplémentaires
                    </Text>
                    <FormControl id="source-of-funds" mt={4}>
                        <FormLabel textAlign="center">Origine des capitaux confiés</FormLabel>
                        <Select
                            placeholder="Veuillez sélectionner"
                            value={formValues.step56}
                            onChange={(e) => setFormValues({ ...formValues, step56: e.target.value })}
                            borderColor={formValues.step56 ? 'yellow.400' : 'gray.200'}
                            color={formValues.step56 ? 'yellow.500' : 'inherit'}
                            _hover={{ borderColor: formValues.step56 ? 'yellow.500' : 'gray.300' }}
                        >
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
                        <FormLabel textAlign="center">Venez vous dans le cadre d’un parrainage ou d’une offre spéciale ?</FormLabel>
                        <HStack justifyContent="center" spacing={4}>
                            <Button
                                variant="outline"
                                colorScheme={!isReferral ? 'yellow' : 'gray'}
                                borderColor={!isReferral ? 'yellow.400' : 'gray.200'}
                                onClick={() => setIsReferral(false)}
                                px={10}
                                py={6}
                                size="lg"
                                _hover={{ bg: 'gray.200' }}
                            >
                                Non
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme={isReferral ? 'yellow' : 'gray'}
                                borderColor={isReferral ? 'yellow.400' : 'gray.200'}
                                onClick={() => setIsReferral(true)}
                                px={10}
                                py={6}
                                size="lg"
                                _hover={{ bg: 'gray.200' }}
                            >
                                Oui
                            </Button>
                        </HStack>
                    </FormControl>
                    {isReferral && (
                        <FormControl id="referral-code" mt={4}>
                            <FormLabel textAlign="center">Renseignez votre code ci-dessous</FormLabel>
                            <Input
                                type="text"
                                value={formValues.step57}
                                onChange={(e) => setFormValues({ ...formValues, step57: e.target.value })}
                                textAlign="center"
                                borderColor={formValues.step57 ? 'yellow.400' : 'gray.200'}
                                _hover={{ borderColor: formValues.step57 ? 'yellow.500' : 'gray.300' }}
                                color={formValues.step57 ? 'yellow.500' : 'inherit'}
                            />
                        </FormControl>
                    )}
                </Section>
                <Modal isOpen={isExampleOpen} onClose={onExampleClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="md" boxShadow="lg" maxW="80%" mt="10%" height="80%">
                        <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
                            <HStack justifyContent="space-between">
                                <Box flex="1" />
                                <Text>Exemple de lettre d'hébergement</Text>
                                <IconButton
                                    icon={<FaTimes />}
                                    aria-label="Close"
                                    variant="ghost"
                                    onClick={onExampleClose}
                                />
                            </HStack>
                        </ModalHeader>
                        <ModalBody p={0} height="100%">
                            <iframe
                                src="https://wrzduukskbcqvxtqevpr.supabase.co/storage/v1/object/public/pdf/conditions.pdf?t=2024-06-27T20%3A41%3A38.178Z"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                                title="Exemple de lettre d'hebergeur"
                            ></iframe>
                        </ModalBody>
                    </ModalContent>
                </Modal>

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
                        colorScheme="yellow"
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
