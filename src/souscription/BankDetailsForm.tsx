import React, { ReactNode, useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    HStack,
    Input,
    Button,
    Select,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon,
    useStyleConfig,
} from '@chakra-ui/react';
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

const BankDetailsForm: React.FC = () => {
    const [initialDeposit, setInitialDeposit] = useState(5000);
    const [recurringDeposit, setRecurringDeposit] = useState(100);
    const [isRecurring, setIsRecurring] = useState(true);
    const [isReferral, setIsReferral] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <ChakraProvider theme={theme}>
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

export default BankDetailsForm;
