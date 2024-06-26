import React, { useState, useEffect, useRef } from 'react';
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
    Button,
    Spinner,
    useDisclosure,
    useStyleConfig
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import EpargneModal from './EpargneModal';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
    const [isPdfModalOpen, setPdfModalOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument('/conditions.pdf');
        loadingTask.promise.then((pdf) => {
            setNumPages(pdf.numPages);
            setLoading(false);

            // Render the first page
            renderPage(pdf, pageNumber);
        });
    }, [pageNumber]);

    const renderPage = (pdf: any, pageNum: number) => {
        pdf.getPage(pageNum).then((page: any) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);
            }
        });
    };

    const nextPage = () => {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
    };

    const prevPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

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
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <canvas ref={canvasRef} />
                                <Box display="flex" justifyContent="space-between" mt={4}>
                                    <Button onClick={prevPage} disabled={pageNumber <= 1}>
                                        Précédente
                                    </Button>
                                    <Button onClick={nextPage} disabled={pageNumber >= (numPages || 1)}>
                                        Suivante
                                    </Button>
                                </Box>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default InsuranceAgreementForm;
