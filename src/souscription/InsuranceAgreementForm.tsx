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
    IconButton,
    HStack,
    useDisclosure,
    useStyleConfig
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import EpargneModal from './EpargneModal';

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

            <EpargneModal isOpen={isEpargneModalOpen} onClose={() => setEpargneModalOpen(false)} />

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
