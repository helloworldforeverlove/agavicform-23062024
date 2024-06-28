import React, { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    Checkbox,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    IconButton,
    HStack,
    Button,
    useDisclosure,
    useStyleConfig,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import Stepper from '../components/Stepper';

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

const InsuranceAgreementForm: React.FC = () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [acknowledgedInfo, setAcknowledgedInfo] = useState(false);
    const [isEpargneModalOpen, setEpargneModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCheckboxChange = (setChecked: React.Dispatch<React.SetStateAction<boolean>>, openModal?: () => void) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setChecked(event.target.checked);
        if (event.target.checked && openModal) {
            openModal();
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={5}/>
            <Box p={5} maxW="800px" mx="auto">
                <Section title="Ouverture d’une Assurance-vie avec un mandat d’arbitrage en profil" variant="gray">
                    <Text mb={4}>
                        C'est la dernière étape ! Afin de finaliser l'ouverture de votre compte Yomoni, veuillez cocher les conditions générales ci-dessous, puis signer électroniquement votre contrat.
                    </Text>
                    <VStack align="start" spacing={3}>
                        <Checkbox
                            isChecked={agreedToTerms}
                            onChange={handleCheckboxChange(setAgreedToTerms)}
                        >
                            Je prends connaissance des{' '}
                            <Box as="span" color="blue.500" textDecoration="underline" cursor="pointer" onClick={onOpen}>
                                Conditions Générales
                            </Box>
                            {' '}de Signature Electronique, du Document d'Informations Clés du contrat, de la Notice et du Règlement du mandat d'arbitrage.
                        </Checkbox>
                        <Checkbox
                            isChecked={acknowledgedInfo}
                            onChange={handleCheckboxChange(setAcknowledgedInfo)}
                        >
                            Je reconnais que Yomoni m'a communiqué les{' '}
                            <Text as="u" color="blue.500">informations détaillées</Text> sur chaque support en unités de compte disponibles sur le contrat Yomoni Vie.
                        </Checkbox>
                    </VStack>
                    <Badge
                        colorScheme="green"
                        variant="solid"
                        mt={4}
                        cursor="pointer"
                        onClick={() => setEpargneModalOpen(true)}
                    >
                        Voir mon projet
                    </Badge>
                </Section>
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
                                    <Text>2 ans</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="bold">VOS VERSEMENTS</Text>
                                <HStack justifyContent="space-between" mt={2}>
                                    <Text>Versement de départ</Text>
                                    <Text>5 000 €</Text>
                                </HStack>
                                <HStack justifyContent="space-between" mt={2}>
                                    <Text>Versements mensuels</Text>
                                    <Text>100 € / mois</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="bold">VOTRE ALLOCATION</Text>
                                <HStack justifyContent="space-between" mt={2} alignItems="center">
                                    <HStack>
                                        <Box
                                            bg="gray.200"
                                            borderRadius="md"
                                            p={1}
                                            fontSize="md"
                                            fontWeight="bold"
                                        >
                                            3
                                        </Box>
                                        <Text>Profil</Text>
                                    </HStack>
                                    <Text>Très peu de prise de risques</Text>
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg" height="100vh">
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
                    <ModalBody p={0} height="calc(100vh - 4rem)">
                        <iframe
                            src="https://wrzduukskbcqvxtqevpr.supabase.co/storage/v1/object/public/pdf/conditions.pdf?t=2024-06-27T20%3A41%3A38.178Z"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Conditions Générales"
                        ></iframe>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default InsuranceAgreementForm;
