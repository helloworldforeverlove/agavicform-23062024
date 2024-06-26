import React, { useState, useEffect } from 'react';
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
    useDisclosure,
    useStyleConfig
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import EpargneModal from './EpargneModal';  // Make sure to import EpargneModal

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

interface SectionProps {
    title: string;
    variant: string;
    children: React.ReactNode;
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

const InsuranceAgreementForm: React.FC = () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [acknowledgedInfo, setAcknowledgedInfo] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEpargneModalOpen, setEpargneModalOpen] = useState(false);
    const [isPdfModalOpen, setPdfModalOpen] = useState(false);

    const handleCheckboxChange = (setChecked: React.Dispatch<React.SetStateAction<boolean>>, openModal?: () => void) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setChecked(event.target.checked);
        if (event.target.checked && openModal) {
            openModal();
        }
    };

    const openPdfModal = () => setPdfModalOpen(true);
    const closePdfModal = () => setPdfModalOpen(false);

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="800px" mx="auto">
                <Section title="Ouverture d’une Assurance-vie avec un mandat d’arbitrage en profil" variant="gray">
                    <Text mb={4}>
                        C'est la dernière étape ! Afin de finaliser l'ouverture de votre compte Yomoni, veuillez cocher les conditions générales ci-dessous, puis signer électroniquement votre contrat.
                    </Text>
                    <VStack align="start" spacing={3}>
                        <Checkbox isChecked={agreedToTerms} onChange={handleCheckboxChange(setAgreedToTerms, openPdfModal)}>
                            Je prends connaissance des Conditions Générales de Signature Electronique, du Document d'Informations Clés du contrat, de la Notice et du Règlement du mandat d'arbitrage.
                        </Checkbox>
                        <Checkbox isChecked={acknowledgedInfo} onChange={handleCheckboxChange(setAcknowledgedInfo)}>
                            Je reconnais que Yomoni m'a communiqué les <Text as="u" color="blue.500">informations détaillées</Text> sur chaque support en unités de compte disponibles sur le contrat Yomoni Vie.
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

            <EpargneModal isOpen={isEpargneModalOpen} onClose={() => setEpargneModalOpen(false)} />

            <Modal isOpen={isPdfModalOpen} onClose={closePdfModal} isCentered size="full">
                <ModalOverlay />
                <ModalContent borderRadius="md" boxShadow="lg">
                    <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
                        <HStack justifyContent="space-between">
                            <Box flex="1" />
                            <Text>Conditions Générales</Text>
                            <IconButton
                                icon={<FaTimes />}
                                aria-label="Close"
                                variant="ghost"
                                onClick={closePdfModal}
                            />
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <iframe
                            src="/path/to/your/pdf/file.pdf"
                            width="100%"
                            height="600px"
                        >
                        </iframe>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default InsuranceAgreementForm;
