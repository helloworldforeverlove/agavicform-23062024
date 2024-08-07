import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    IconButton,
    HStack,
    Button,
    Input,
    useDisclosure,
    useStyleConfig,
} from '@chakra-ui/react';
import { FaTimes, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        blue: '#3182CE',
        yellow: {
            100: '#C6F6D5',
            200: '#9AE6B4',
            400: '#48BB78',
            900: '#22543D',
        },
    },
});

const Section: React.FC<{ title: string; variant: string; children: React.ReactNode }> = ({
    title,
    variant,
    children,
}) => {
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

const formatNumber = (number: string) => {
    return parseInt(number, 10).toLocaleString('fr-FR');
};

const getRiskDescription = (riskScore: number) => {
    switch (riskScore) {
        case 1:
            return 'Sécurité';
        case 2:
            return 'Prudent';
        case 3:
            return 'Prudent';
        case 4:
            return 'Équilibré';
        case 5:
            return 'Équilibré';
        case 6:
            return 'Dynamique';
        case 7:
            return 'Dynamique';
        default:
            return 'Unknown';
    }
};

const InsuranceAgreementForm: React.FC = () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [acknowledgedInfo, setAcknowledgedInfo] = useState(false);
    const [isEpargneModalOpen, setEpargneModalOpen] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [signature, setSignature] = useState('');
    const [projectData, setProjectData] = useState({
        step2: '',
        step3: '',
        step4: '',
        risk_score: 0,
        color_code: '',
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isInfoModalOpen,
        onOpen: onInfoModalOpen,
        onClose: onInfoModalClose,
    } = useDisclosure();
    const { uuid, getResponse } = useUuid();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponse = async () => {
            const step73 = await getResponse(73);
            const step74 = await getResponse(74);
            setAgreedToTerms(step73 === 'true');
            setAcknowledgedInfo(step74 === 'true');

            const { data, error } = await supabase
                .from('form_responses')
                .select('step2, step3, step4, risk_score, color_code')
                .eq('id', uuid)
                .single();

            if (error) {
                console.error('Error fetching project data:', error);
            } else {
                setProjectData({
                    step2: data.step2,
                    step3: data.step3,
                    step4: data.step4,
                    risk_score: data.risk_score,
                    color_code: data.color_code,
                });
            }
        };

        fetchResponse();
    }, [getResponse, uuid]);

    const handleSubmit = async () => {
        const { error } = await supabase
            .from('form_responses')
            .update({
                step73: agreedToTerms,
                step74: acknowledgedInfo,
            })
            .eq('id', uuid);

        if (error) {
            console.error('Error updating form responses:', error);
        } else {
            setShowPdf(true);
        }
    };

    const handleSignatureSubmit = () => {
        console.log("Signature submitted:", signature);
        // Ajouter la logique pour traiter la signature ici
    };

    const handleValidate = () => {
        handleSignatureSubmit();
        navigate('/profil-investisseur');
    };

    return (
        <ChakraProvider theme={theme}>
            <Box position="relative">
                <Stepper currentStep={5} />
                <Button
                    leftIcon={<FaEye />}
                    colorScheme="yellow"
                    variant="solid"
                    size="sm"
                    position="absolute"
                    top={["120px", "110px", "100px", "100px"]}
                    right={["20px", "20px", "100px", "200px"]}
                    cursor="pointer"
                    onClick={() => setEpargneModalOpen(true)}
                    padding="8px 12px"
                    borderRadius="md"
                >
                    Voir mon projet
                </Button>
            </Box>
            <Box p={5} maxW="800px" mx="auto">
                <Section title="Ouverture d’une Assurance-vie avec un mandat d’arbitrage en profil" variant="gray">
                    <Text mb={4}>
                        C'est la dernière étape ! Afin de finaliser l'ouverture de votre compte PatriLife, veuillez cocher les conditions générales ci-dessous, puis signer électroniquement votre contrat.
                    </Text>
                    <VStack align="start" spacing={3}>
                        <Checkbox
                            isChecked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            colorScheme="yellow"
                            size="lg"
                        >
                            <Box onClick={(e) => e.preventDefault()} ml={2}>
                                Je prends connaissance des{' '}
                                <Text
                                    as="span"
                                    color="blue.500"
                                    textDecoration="underline"
                                    cursor="pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpen();
                                    }}
                                >
                                    Conditions Générales
                                </Text>
                                {' '}de Signature Electronique, du Document d'Informations Clés du contrat, de la Notice et du Règlement du mandat d'arbitrage.
                            </Box>
                        </Checkbox>

                        <Checkbox
                            isChecked={acknowledgedInfo}
                            onChange={(e) => setAcknowledgedInfo(e.target.checked)}
                            colorScheme="yellow"
                            size="lg"
                        >
                            <Box onClick={(e) => e.preventDefault()} ml={2}>
                                Je reconnais que PatriLife m'a communiqué les{' '}
                                <Text
                                    as="span"
                                    color="blue.500"
                                    textDecoration="underline"
                                    cursor="pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onInfoModalOpen();
                                    }}
                                >
                                    informations détaillées
                                </Text>
                                {' '}sur chaque support en unités de compte disponibles sur le contrat PatriLife Vie.
                            </Box>
                        </Checkbox>
                    </VStack>
                </Section>
                <Button
                    colorScheme="yellow"
                    mt={4}
                    onClick={handleSubmit}
                    isDisabled={!agreedToTerms || !acknowledgedInfo}
                >
                    Soumettre
                </Button>

                {showPdf && (
                    <Box mt={4}>
                        <iframe
                            src="/pdf/souscription.pdf"
                            width="100%"
                            height="600px"
                            style={{ border: 'none' }}
                            title="Conditions Générales"
                        ></iframe>
                        <Box mt={4}>
                            <Input
                                placeholder="Signez ici"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                size="lg"
                                borderColor="gray.300"
                                _hover={{ borderColor: 'gray.400' }}
                            />
                            <Button
                                colorScheme="blue"
                                mt={2}
                                onClick={handleSignatureSubmit}
                            >
                                Soumettre la signature
                            </Button>
                            <Button
                                colorScheme="green"
                                mt={2}
                                onClick={handleValidate}
                            >
                                Valider
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            <Modal isOpen={isEpargneModalOpen} onClose={() => setEpargneModalOpen(false)} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
                        <HStack justifyContent="space-between">
                            <Box flex="1" />
                            <Text>Vous avez fait les choix suivants pour votre projet d'épargne.</Text>
                            <IconButton
                                icon={<FaTimes />}
                                aria-label="Close"
                                variant="ghost"
                                onClick={() => setEpargneModalOpen(false)}
                            />
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="bold">VOS OBJECTIFS</Text>
                                <HStack justifyContent="space-between" mt={2}>
                                    <Text>Durée de votre placement</Text>
                                    <Text>{formatNumber(projectData.step4)} ans</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="bold">VOS VERSEMENTS</Text>
                                <HStack justifyContent="space-between" mt={2}>
                                    <Text>Versement de départ</Text>
                                    <Text>{formatNumber(projectData.step2)} €</Text>
                                </HStack>
                                <HStack justifyContent="space-between" mt={2}>
                                    <Text>Versements mensuels</Text>
                                    <Text>{formatNumber(projectData.step3)} € / mois</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="bold">VOTRE ALLOCATION</Text>
                                <HStack justifyContent="space-between" mt={2} alignItems="center">
                                    <HStack>
                                        <Box
                                            bg={projectData.color_code}
                                            borderRadius="md"
                                            p={3}
                                            fontSize="md"
                                            fontWeight="bold"
                                            color="white"
                                        >
                                            {projectData.risk_score}
                                        </Box>

                                    </HStack>
                                    <Text>Profil : {getRiskDescription(projectData.risk_score)}</Text>
                                </HStack>
                            </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter flexDirection="column">
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            mb={4}
                            width="100%"
                            onClick={() => console.log('Modify project clicked')}
                        >
                            JE SOUHAITE MODIFIER MON PROJET
                        </Button>
                        <Text textAlign="center" fontSize="sm" color="gray.500">
                            Vous pouvez modifier votre projet quand bon vous semble.
                            Nous vous ferons passer de nouveau les étapes nécessaires,
                            pour vérifier que votre projet est toujours réalisable.
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg" maxW="80%" mt="10%" height="80%">
                    <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
                        <HStack justifyContent="space-between">
                            <Box flex="1" />
                            <Text>Conditions Générales</Text>
                            <IconButton
                                icon={<FaTimes />}
                                aria-label="Close"
                                variant="ghost"
                                onClick={onClose}
                            />
                        </HStack>
                    </ModalHeader>
                    <ModalBody p={0} height="100%">
                        <iframe
                            src="/pdf/conditions.pdf"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Conditions Générales"
                        ></iframe>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg" maxW="80%" mt="10%" height="80%">
                    <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
                        <HStack justifyContent="space-between">
                            <Box flex="1" />
                            <Text>Informations Détaillées</Text>
                            <IconButton
                                icon={<FaTimes />}
                                aria-label="Close"
                                variant="ghost"
                                onClick={onInfoModalClose}
                            />
                        </HStack>
                    </ModalHeader>
                    <ModalBody p={0} height="100%">
                        <iframe
                            src="/pdf/informationsdetaillee.pdf"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Informations Détaillées"
                        ></iframe>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default InsuranceAgreementForm;
