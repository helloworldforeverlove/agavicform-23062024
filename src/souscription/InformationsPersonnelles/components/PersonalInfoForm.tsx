import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
    Select,
    HStack,
    useStyleConfig,
    InputProps,
    SelectProps,
    FormControl,
    Alert,
    AlertIcon,
    AlertDescription,
    Tooltip,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { useUuid } from './../../../context/UuidContext';
import Stepper from '../../../components/Stepper';
import CountriesDropdown from './CountriesDropdown';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
        green: {
            400: '#38A169',
            500: '#2F855A',
        },
        blue: {
            400: '#3182CE',
        },
    },
    components: {
        CustomInput: {
            baseStyle: {
                borderColor: 'gray.200',
                _hover: {
                    borderColor: 'gray.500',
                },
                _focus: {
                    borderColor: 'gray.500',
                    boxShadow: '0 0 0 1px gray.500',
                },
            },
        },
    },
});

const CustomInput: React.FC<InputProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'green.500',
        color: 'green.500',
        boxShadow: '0 0 0 1px green.500',
    } : {};

    return (
        <Input
            sx={{
                ...styles,
                ...filledStyles,
            }}
            {...props}
        />
    );
};

const CustomSelect: React.FC<SelectProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'green.500',
        color: 'green.500',
        boxShadow: '0 0 0 1px green.500',
    } : {};

    return (
        <Select
            sx={{
                ...styles,
                ...filledStyles,
            }}
            {...props}
        />
    );
};

const PersonalInfoForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        civilite: '',
        dateDeNaissance: '',
        nom: '',
        prenom: '',
        paysDeNaissance: '',
        lieuDeNaissance: '',
        situationFamiliale: '',
        capaciteJuridique: '',
        nationalite: '',
        paysNationalite: '',
        connuYomoni: '',
        street: '',
        additionalInfo: '',
        postalCode: '',
        city: '',
        paysAdresse: '',
        email: '',
        phoneNumber: '',
        vousEtes: '',
        tns: '',
        secteurActivite: '',
        categorieSocioPro: '',
        dirigeantSocieteCotee: '',
        fonctionPolitiquementExposee: '',
        entourageFonctionPolitiquementExposee: '',
    });

    const [errors, setErrors] = useState({
        civilite: false,
        dateDeNaissance: false,
        nom: false,
        prenom: false,
        paysDeNaissance: false,
        lieuDeNaissance: false,
        situationFamiliale: false,
        capaciteJuridique: false,
        nationalite: false,
        paysNationalite: false,
        connuYomoni: false,
        street: false,
        postalCode: false,
        city: false,
        paysAdresse: false,
        email: false,
        phoneNumber: false,
        vousEtes: false,
        tns: false,
        secteurActivite: false,
        categorieSocioPro: false,
        dirigeantSocieteCotee: false,
        fonctionPolitiquementExposee: false,
        entourageFonctionPolitiquementExposee: false,
    });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { uuid, updateResponse, getResponse } = useUuid();
    const formatPhoneNumber = (value: string): string => {
        // Remove all non-digit characters
        const cleaned = ('' + value).replace(/\D/g, '');
        // Match the cleaned input and format it
        const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
        if (match) {
            return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
        }
        return value;
    };    

    useEffect(() => {
        const fetchResponse = async () => {
            const civilite = await getResponse(27); // 'civilite' is step 27
            const dateDeNaissance = await getResponse(5); // 'dateDeNaissance' is step 5
            const nom = await getResponse(28); // 'nom' is step 28
            const prenom = await getResponse(29); // 'prenom' is step 29
            const paysDeNaissance = await getResponse(30); // 'paysDeNaissance' is step 30
            const lieuDeNaissance = await getResponse(31); // 'lieuDeNaissance' is step 31
            const situationFamiliale = await getResponse(32); // 'situationFamiliale' is step 32
            const capaciteJuridique = await getResponse(33); // 'capaciteJuridique' is step 33
            const nationalite = await getResponse(34); // 'nationalite' is step 34
            const paysNationalite = await getResponse(35); // 'paysNationalite' is step 35
            const connuYomoni = await getResponse(36); // 'connuYomoni' is step 36
            const street = await getResponse(37); // 'street' is step 37
            const additionalInfo = await getResponse(38); // 'additionalInfo' is step 38
            const postalCode = await getResponse(39); // 'postalCode' is step 39
            const city = await getResponse(40); // 'city' is step 40
            const paysAdresse = await getResponse(41); // 'paysAdresse' is step 41
            const email = await getResponse(42); // 'email' is step 42
            const phoneNumber = await getResponse(43); // 'phoneNumber' is step 43
            const vousEtes = await getResponse(44); // 'vousEtes' is step 44
            const tns = await getResponse(45); // 'tns' is step 45
            const secteurActivite = await getResponse(46); // 'secteurActivite' is step 46
            const categorieSocioPro = await getResponse(47); // 'categorieSocioPro' is step 47
            const dirigeantSocieteCotee = await getResponse(48); // 'dirigeantSocieteCotee' is step 48
            const fonctionPolitiquementExposee = await getResponse(49); // 'fonctionPolitiquementExposee' is step 49
            const entourageFonctionPolitiquementExposee = await getResponse(50); // 'entourageFonctionPolitiquementExposee' is step 50

            setFormValues({
                civilite: civilite || '',
                dateDeNaissance: dateDeNaissance || '',
                nom: nom || '',
                prenom: prenom || '',
                paysDeNaissance: paysDeNaissance || '',
                lieuDeNaissance: lieuDeNaissance || '',
                situationFamiliale: situationFamiliale || '',
                capaciteJuridique: capaciteJuridique || '',
                nationalite: nationalite || '',
                paysNationalite: paysNationalite || '',
                connuYomoni: connuYomoni || '',
                street: street || '',
                additionalInfo: additionalInfo || '',
                postalCode: postalCode || '',
                city: city || '',
                paysAdresse: paysAdresse || '',
                email: email || '',
                phoneNumber: phoneNumber ? formatPhoneNumber(phoneNumber) : '',
                vousEtes: vousEtes || '',
                tns: tns || '',
                secteurActivite: secteurActivite || '',
                categorieSocioPro: categorieSocioPro || '',
                dirigeantSocieteCotee: dirigeantSocieteCotee || '',
                fonctionPolitiquementExposee: fonctionPolitiquementExposee || '',
                entourageFonctionPolitiquementExposee: entourageFonctionPolitiquementExposee || '',
            });
        };

        fetchResponse();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Format phone number if the field is phoneNumber
        const formattedValue = name === 'phoneNumber' ? formatPhoneNumber(value) : value;

        setFormValues({
            ...formValues,
            [name]: formattedValue,
        });
    };

    const handleCiviliteChange = (civilite: string) => {
        setFormValues({
            ...formValues,
            civilite,
        });
    };

    const validateForm = () => {
        const newErrors = {
            civilite: formValues.civilite === '',
            dateDeNaissance: formValues.dateDeNaissance === '',
            nom: formValues.nom === '',
            prenom: formValues.prenom === '',
            paysDeNaissance: formValues.paysDeNaissance === '',
            lieuDeNaissance: formValues.lieuDeNaissance === '',
            situationFamiliale: formValues.situationFamiliale === '',
            capaciteJuridique: formValues.capaciteJuridique === '',
            nationalite: formValues.nationalite === '',
            paysNationalite: formValues.paysNationalite === '',
            connuYomoni: formValues.connuYomoni === '',
            street: formValues.street === '',
            postalCode: formValues.postalCode === '',
            city: formValues.city === '',
            paysAdresse: formValues.paysAdresse === '',
            email: formValues.email === '',
            phoneNumber: formValues.phoneNumber === '',
            vousEtes: formValues.vousEtes === '',
            tns: formValues.tns === '',
            secteurActivite: formValues.secteurActivite === '',
            categorieSocioPro: formValues.categorieSocioPro === '',
            dirigeantSocieteCotee: formValues.dirigeantSocieteCotee === '',
            fonctionPolitiquementExposee: formValues.fonctionPolitiquementExposee === '',
            entourageFonctionPolitiquementExposee: formValues.entourageFonctionPolitiquementExposee === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const saveDataToDatabase = async (data: { [key: string]: string }) => {
        try {
            const response = await fetch(`https://wrzduukskbcqvxtqevpr.supabase.co/rest/v1/form_responses?id=eq.${uuid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'YOUR_SUPABASE_API_KEY', // Replace with your actual Supabase API key
                    'Authorization': `Bearer YOUR_SUPABASE_API_KEY` // Replace with your actual Supabase API key
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const result = await response.json();
            console.log('Data saved:', result);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await updateResponse(27, formValues.civilite);
            await updateResponse(5, formValues.dateDeNaissance);
            await updateResponse(28, formValues.nom);
            await updateResponse(29, formValues.prenom);
            await updateResponse(30, formValues.paysDeNaissance);
            await updateResponse(31, formValues.lieuDeNaissance);
            await updateResponse(32, formValues.situationFamiliale);
            await updateResponse(33, formValues.capaciteJuridique);
            await updateResponse(34, formValues.nationalite);
            await updateResponse(35, formValues.paysNationalite);
            await updateResponse(36, formValues.connuYomoni);
            await updateResponse(37, formValues.street);
            await updateResponse(38, formValues.additionalInfo);
            await updateResponse(39, formValues.postalCode);
            await updateResponse(40, formValues.city);
            await updateResponse(41, formValues.paysAdresse);
            await updateResponse(42, formValues.email);
            await updateResponse(43, formValues.phoneNumber);
            await updateResponse(44, formValues.vousEtes);
            await updateResponse(45, formValues.tns);
            await updateResponse(46, formValues.secteurActivite);
            await updateResponse(47, formValues.categorieSocioPro);
            await updateResponse(48, formValues.dirigeantSocieteCotee);
            await updateResponse(49, formValues.fonctionPolitiquementExposee);
            await updateResponse(50, formValues.entourageFonctionPolitiquementExposee);
    
            // Save data to the database
            await saveDataToDatabase({
                step27: formValues.civilite,
                step5: formValues.dateDeNaissance,
                step28: formValues.nom,
                step29: formValues.prenom,
                step30: formValues.paysDeNaissance,
                step31: formValues.lieuDeNaissance,
                step32: formValues.situationFamiliale,
                step33: formValues.capaciteJuridique,
                step34: formValues.nationalite,
                step35: formValues.paysNationalite,
                step36: formValues.connuYomoni,
                step37: formValues.street,
                step38: formValues.additionalInfo,
                step39: formValues.postalCode,
                step40: formValues.city,
                step41: formValues.paysAdresse,
                step42: formValues.email,
                step43: formValues.phoneNumber,
                step44: formValues.vousEtes,
                step45: formValues.tns,
                step46: formValues.secteurActivite,
                step47: formValues.categorieSocioPro,
                step48: formValues.dirigeantSocieteCotee,
                step49: formValues.fonctionPolitiquementExposee,
                step50: formValues.entourageFonctionPolitiquementExposee,
            });
    
            navigate('/pieces-justificatives'); // Replace with the actual next step
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={3} />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Veuillez entrer vos informations personnelles
                </Text>
                <VStack spacing={4} align="stretch" mx="auto">
                    <Box>
                        <Text fontSize="md" mb={2}>Civilité</Text>
                        <HStack justifyContent="center" mb={6}>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.civilite === 'Monsieur' ? 'green' : 'gray'}
                                onClick={() => handleCiviliteChange('Monsieur')}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.civilite === 'Monsieur' ? 'green.400' : 'gray.200'}
                            >
                                Monsieur
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.civilite === 'Madame' ? 'green' : 'gray'}
                                onClick={() => handleCiviliteChange('Madame')}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.civilite === 'Madame' ? 'green.400' : 'gray.200'}
                            >
                                Madame
                            </Button>
                        </HStack>
                    </Box>

                    <FormControl isInvalid={errors.dateDeNaissance}>
                        <Text fontSize="md" mb={2}>Date de naissance</Text>
                        <CustomInput
                            type="date"
                            name="dateDeNaissance"
                            value={formValues.dateDeNaissance}
                            onChange={handleInputChange}
                            mb={4}
                        />
                        <Alert status="info" mt={2} backgroundColor="blue.100" borderRadius="md">
                            <AlertIcon color="blue.400" />
                            <AlertDescription color="blue.600">
                                <Link to="/quel-est-votre-date-de-naissance">
                                    Vous pouvez modifier cette information à l'étape 5.
                                </Link>
                            </AlertDescription>
                        </Alert>
                        {errors.dateDeNaissance && (
                            <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                <AlertIcon color="orange.400" />
                                <AlertDescription color="orange.600">Veuillez entrer une date de naissance.</AlertDescription>
                            </Alert>
                        )}
                    </FormControl>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.nom}>
                                <Text fontSize="md" mb={2}>Nom</Text>
                                <CustomInput
                                    type="text"
                                    name="nom"
                                    value={formValues.nom}
                                    onChange={handleInputChange}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Le nom doit être écrit en entier comme sur votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.prenom}>
                                <Text fontSize="md" mb={2}>Prénom</Text>
                                <CustomInput
                                    type="text"
                                    name="prenom"
                                    value={formValues.prenom}
                                    onChange={handleInputChange}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Uniquement le 1er prénom de votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>
                    </HStack>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.paysDeNaissance}>
                                <Text fontSize="md" mb={2}>Pays de naissance</Text>
                                <CountriesDropdown
                                    name="paysDeNaissance"
                                    value={formValues.paysDeNaissance}
                                    onChange={handleInputChange}
                                    mb={4}
                                />
                                {errors.paysDeNaissance && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner un pays de naissance.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.lieuDeNaissance}>
                                <Text fontSize="md" mb={2}>Lieu de naissance</Text>
                                <CustomInput
                                    type="text"
                                    name="lieuDeNaissance"
                                    value={formValues.lieuDeNaissance}
                                    onChange={handleInputChange}
                                    mb={4}
                                />
                                <Alert status="warning" mt={2} backgroundColor="green.100" borderRadius="md">
                                    <AlertIcon color="green.400" />
                                    <AlertDescription color="green.600">Le lieu de naissance doit être orthographié comme sur votre pièce d'identité.</AlertDescription>
                                </Alert>
                            </FormControl>
                        </VStack>
                    </HStack>

                    <HStack spacing={4} mb={4} alignItems="start">
                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.situationFamiliale}>
                                <Text fontSize="md" mb={2}>Situation familiale</Text>
                                <CustomSelect
                                    name="situationFamiliale"
                                    value={formValues.situationFamiliale}
                                    onChange={handleInputChange}
                                    mb={4}
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    <option value="Célibataire">Célibataire</option>
                                    <option value="Divorcé(e)">Divorcé(e)</option>
                                    <option value="Marié(e)">Marié(e)</option>
                                    <option value="Séparé(e)">Séparé(e)</option>
                                    <option value="Union autre">Union autre</option>
                                    <option value="Veuf(ve)">Veuf(ve)</option>
                                    <option value="Pacsé(e)">Pacsé(e)</option>
                                </CustomSelect>
                                {errors.situationFamiliale && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une situation familiale.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>

                        <VStack flex={1} align="stretch">
                            <FormControl isInvalid={errors.capaciteJuridique}>
                                <Text fontSize="md" mb={2}>Capacité juridique</Text>
                                <CustomSelect
                                    name="capaciteJuridique"
                                    value={formValues.capaciteJuridique}
                                    onChange={handleInputChange}
                                    mb={4}
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    <option value="Majeur capable">Majeur capable</option>
                                    <option value="Majeur sous tutelle">Majeur sous tutelle</option>
                                    <option value="Majeur sous curatelle">Majeur sous curatelle</option>
                                </CustomSelect>
                                {errors.capaciteJuridique && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une capacité juridique.</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>
                    </HStack>

                    <Box>
                        <Text fontSize="md" mb={2}>Nationalité / Résident américain(e)</Text>
                        <Text mb={2}>Êtes-vous résident(e) américain(e) ou possédez-vous la nationalité américaine ?</Text>
                        <HStack justifyContent="center" mb={6}>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.nationalite === 'Non' ? 'green' : 'gray'}
                                onClick={() => setFormValues({ ...formValues, nationalite: 'Non' })}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.nationalite === 'Non' ? 'green.400' : 'gray.200'}
                            >
                                Non
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                colorScheme={formValues.nationalite === 'Oui' ? 'green' : 'gray'}
                                onClick={() => setFormValues({ ...formValues, nationalite: 'Oui' })}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={formValues.nationalite === 'Oui' ? 'green.400' : 'gray.200'}
                            >
                                Oui
                            </Button>
                        </HStack>
                    </Box>

                    <FormControl isInvalid={errors.paysNationalite}>
                        <Text fontSize="md" mb={2}>Pays de nationalité</Text>
                        <CountriesDropdown
                            name="paysNationalite"
                            value={formValues.paysNationalite}
                            onChange={handleInputChange}
                            mb={4}
                        />
                        {errors.paysNationalite && (
                            <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                <AlertIcon color="orange.400" />
                                <AlertDescription color="orange.600">Veuillez sélectionner un pays de nationalité.</AlertDescription>
                            </Alert>
                        )}
                    </FormControl>

                    <FormControl isInvalid={errors.connuYomoni}>
                        <Text fontSize="md" mb={2}>Comment avez-vous connu Yomoni ?</Text>
                        <CustomSelect
                            name="connuYomoni"
                            value={formValues.connuYomoni}
                            onChange={handleInputChange}
                            mb={4}
                        >
                            <option value="">Veuillez sélectionner</option>
                            <option value="Articles de presse">Articles de presse</option>
                            <option value="Publicité Presse">Publicité Presse</option>
                            <option value="Publicité Affichage">Publicité Affichage</option>
                            <option value="Publicité Internet">Publicité Internet</option>
                            <option value="Site spécialisé en épargne">Site spécialisé en épargne</option>
                            <option value="Connaissance">Connaissance</option>
                            <option value="Moteur de recherche">Moteur de recherche</option>
                            <option value="Réseaux sociaux, Podcasts">Réseaux sociaux, Podcasts</option>
                            <option value="Télévision">Télévision</option>
                        </CustomSelect>
                        {errors.connuYomoni && (
                            <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                <AlertIcon color="orange.400" />
                                <AlertDescription color="orange.600">Veuillez sélectionner une option pour Comment avez-vous connu Yomoni ?.</AlertDescription>
                            </Alert>
                        )}
                    </FormControl>

                    <Box mt={8}>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>Votre adresse fiscale</Text>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.street}>
                                    <Text fontSize="md" mb={2}>Numéro et nom de rue</Text>
                                    <CustomInput
                                        name="street"
                                        placeholder="Indiquez un lieu"
                                        value={formValues.street}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <Text fontSize="md" mb={2}>Informations complémentaires</Text>
                                    <CustomInput
                                        name="additionalInfo"
                                        placeholder="FACULTATIF"
                                        value={formValues.additionalInfo}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.postalCode}>
                                    <Text fontSize="md" mb={2}>Code postal</Text>
                                    <CustomInput
                                        name="postalCode"
                                        value={formValues.postalCode}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl isInvalid={errors.city}>
                                    <Text fontSize="md" mb={2}>Ville</Text>
                                    <CustomInput
                                        name="city"
                                        placeholder="Recherchez le nom de la ville"
                                        value={formValues.city}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl isInvalid={errors.paysAdresse}>
                                <Text fontSize="md" mb={2}>Pays</Text>
                                <CountriesDropdown
                                    name="paysAdresse"
                                    value={formValues.paysAdresse}
                                    onChange={handleInputChange}
                                    mb={4}
                                />
                            </FormControl>
                        </VStack>
                    </Box>

                    <Box mt={8}>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>Informations de contact</Text>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.email}>
                                    <Text fontSize="md" mb={2}>Adresse e-mail</Text>
                                    <CustomInput
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl isInvalid={errors.phoneNumber}>
                                    <Text fontSize="md" mb={2}>Numéro de téléphone mobile</Text>
                                    <CustomInput
                                        name="phoneNumber"
                                        placeholder="06 10 00 00 00"
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </HStack>
                        </VStack>
                    </Box>

                    <Box mt={8}>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>Situation professionnelle</Text>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.vousEtes}>
                                    <Text fontSize="md" mb={2}>Vous êtes</Text>
                                    <CustomSelect
                                        name="vousEtes"
                                        value={formValues.vousEtes}
                                        onChange={handleInputChange}
                                        mb={4}
                                    >
                                        <option value="">Veuillez sélectionner</option>
                                        <option value="Actif(ve)">Actif(ve)</option>
                                        <option value="Demandeur d'emploi">Demandeur d'emploi</option>
                                        <option value="Etudiant(e)">Etudiant(e)</option>
                                        <option value="Retraité(e)">Retraité(e)</option>
                                        <option value="Autre inactif(ve)">Autre inactif(ve)</option>
                                    </CustomSelect>
                                    {errors.vousEtes && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Vous êtes".</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={errors.tns}>
                                    <Text fontSize="md" mb={2}>
                                        Êtes-vous Travailleur Non Salarié (TNS) ?
                                        <Tooltip label="Si vous êtes Auto-entrepreneur, en Entreprise individuelle (EIRL), en EURL, en SARL avec gérant majoritaire ou dans le cas de professions libérales et assimilées.">
                                            <span> <i className="info-icon">i</i> </span>
                                        </Tooltip>
                                    </Text>
                                    <HStack justifyContent="center" mb={4}>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            colorScheme={formValues.tns === 'Non' ? 'green' : 'gray'}
                                            onClick={() => setFormValues({ ...formValues, tns: 'Non' })}
                                            px={10}
                                            py={6}
                                            textAlign="center"
                                            _hover={{ bg: 'gray.200' }}
                                            borderColor={formValues.tns === 'Non' ? 'green.400' : 'gray.200'}
                                        >
                                            Non
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            colorScheme={formValues.tns === 'Oui' ? 'green' : 'gray'}
                                            onClick={() => setFormValues({ ...formValues, tns: 'Oui' })}
                                            px={10}
                                            py={6}
                                            textAlign="center"
                                            _hover={{ bg: 'gray.200' }}
                                            borderColor={formValues.tns === 'Oui' ? 'green.400' : 'gray.200'}
                                        >
                                            Oui
                                        </Button>
                                    </HStack>
                                    {errors.tns && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Êtes-vous Travailleur Non Salarié (TNS) ?".</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>
                            </HStack>
                            <HStack spacing={4}>
                                <FormControl isInvalid={errors.secteurActivite}>
                                    <Text fontSize="md" mb={2}>Secteur d'activité</Text>
                                    <CustomSelect
                                        name="secteurActivite"
                                        value={formValues.secteurActivite}
                                        onChange={handleInputChange}
                                        mb={4}
                                    >
                                        <option value="">Veuillez sélectionner</option>
                                        <option value="Administration publique, Education, Formation">Administration publique, Education, Formation</option>
                                        <option value="Aéronautique">Aéronautique</option>
                                        <option value="Agroalimentaire">Agroalimentaire</option>
                                        <option value="Audiovisuel">Audiovisuel</option>
                                        <option value="Automobile">Automobile</option>
                                        <option value="Banque, Assurance, Finance">Banque, Assurance, Finance</option>
                                        <option value="Bois, Papier, Carton, Imprimerie">Bois, Papier, Carton, Imprimerie</option>
                                        <option value="Chimie, Parachimie">Chimie, Parachimie</option>
                                        <option value="Commerce de détail">Commerce de détail</option>
                                        <option value="Commerce de l'art">Commerce de l'art</option>
                                        <option value="Commerce du jeu">Commerce du jeu</option>
                                        <option value="Communication, Documentation, Information, Marketing">Communication, Documentation, Information, Marketing</option>
                                        <option value="Défense, Sécurité">Défense, Sécurité</option>
                                        <option value="Electronique, Electricité">Electronique, Electricité</option>
                                        <option value="Energie, Armement, Marchés publics">Energie, Armement, Marchés publics</option>
                                        <option value="Etudes, Conseil">Etudes, Conseil</option>
                                        <option value="Grande distribution">Grande distribution</option>
                                        <option value="Immobilier, Bâtiment, Travaux Publics">Immobilier, Bâtiment, Travaux Publics</option>
                                        <option value="Informatique">Informatique</option>
                                        <option value="Justice, profession réglementée">Justice, profession réglementée</option>
                                        <option value="Mécanique">Mécanique</option>
                                        <option value="Métallurgie">Métallurgie</option>
                                        <option value="Négoce, Import export">Négoce, Import export</option>
                                        <option value="Restauration, Hébergement">Restauration, Hébergement</option>
                                        <option value="Santé">Santé</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Télécommunications">Télécommunications</option>
                                        <option value="Transport, Logistique">Transport, Logistique</option>
                                    </CustomSelect>
                                    {errors.secteurActivite && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Secteur d'activité".</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={errors.categorieSocioPro}>
                                    <Text fontSize="md" mb={2}>Catégorie socio-professionnelle</Text>
                                    <CustomSelect
                                        name="categorieSocioPro"
                                        value={formValues.categorieSocioPro}
                                        onChange={handleInputChange}
                                        mb={4}
                                    >
                                        <option value="">Veuillez sélectionner</option>
                                        <option value="Agriculteurs exploitants">Agriculteurs exploitants</option>
                                        <option value="Artisans">Artisans</option>
                                        <option value="Commerçants et assimilés">Commerçants et assimilés</option>
                                        <option value="Chefs d'entreprise de 10 salariés ou plus">Chefs d'entreprise de 10 salariés ou plus</option>
                                        <option value="Professions libérales et assimilés">Professions libérales et assimilés</option>
                                        <option value="Cadres de la fonction publique, professions intellectuelles et artistiques">Cadres de la fonction publique, professions intellectuelles et artistiques</option>
                                        <option value="Cadres d'entreprise">Cadres d'entreprise</option>
                                        <option value="Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et assimilés">Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et assimilés</option>
                                        <option value="Professions intermédiaires administratives et commerciales des entreprises">Professions intermédiaires administratives et commerciales des entreprises</option>
                                        <option value="Techniciens">Techniciens</option>
                                        <option value="Contremaîtres, agents de maîtrise">Contremaîtres, agents de maîtrise</option>
                                        <option value="Employés de la fonction publique">Employés de la fonction publique</option>
                                        <option value="Employés administratifs d'entreprise">Employés administratifs d'entreprise</option>
                                        <option value="Employés de commerce">Employés de commerce</option>
                                        <option value="Personnels des services directs aux particuliers">Personnels des services directs aux particuliers</option>
                                        <option value="Ouvriers qualifiés">Ouvriers qualifiés</option>
                                        <option value="Ouvriers non qualifiés">Ouvriers non qualifiés</option>
                                        <option value="Ouvriers agricoles">Ouvriers agricoles</option>
                                    </CustomSelect>
                                    {errors.categorieSocioPro && (
                                        <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                            <AlertIcon color="orange.400" />
                                            <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Catégorie socio-professionnelle".</AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>
                            </HStack>

                            <FormControl isInvalid={errors.dirigeantSocieteCotee}>
                                <Text fontSize="md" mb={2}>Êtes-vous dirigeant ou salarié d'une société cotée ?</Text>
                                <HStack justifyContent="center" mb={4}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.dirigeantSocieteCotee === 'Non' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, dirigeantSocieteCotee: 'Non' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.dirigeantSocieteCotee === 'Non' ? 'green.400' : 'gray.200'}
                                    >
                                        Non
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.dirigeantSocieteCotee === 'Oui' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, dirigeantSocieteCotee: 'Oui' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.dirigeantSocieteCotee === 'Oui' ? 'green.400' : 'gray.200'}
                                    >
                                        Oui
                                    </Button>
                                </HStack>
                                {errors.dirigeantSocieteCotee && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Êtes-vous dirigeant ou salarié d'une société cotée ?".</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.fonctionPolitiquementExposee}>
                                <Text fontSize="lg" mb={2}>Exercez-vous ou avez-vous exercé une fonction politiquement exposée ?</Text>
                                <Text mb={2}>Par exemple : ministre, ambassadeur, parlementaire, administrateur d'une entreprise publique...</Text>
                                <HStack justifyContent="center" mb={4}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.fonctionPolitiquementExposee === 'Non' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, fonctionPolitiquementExposee: 'Non' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.fonctionPolitiquementExposee === 'Non' ? 'green.400' : 'gray.200'}
                                    >
                                        Non
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.fonctionPolitiquementExposee === 'Oui' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, fonctionPolitiquementExposee: 'Oui' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.fonctionPolitiquementExposee === 'Oui' ? 'green.400' : 'gray.200'}
                                    >
                                        Oui
                                    </Button>
                                </HStack>
                                {errors.fonctionPolitiquementExposee && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Exercez-vous ou avez-vous exercé une fonction politiquement exposée ?".</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.entourageFonctionPolitiquementExposee}>
                                <Text fontSize="lg" mb={2}>Une personne de votre entourage exerce-t-elle ou a-t-elle exercé depuis moins d'un an une fonction politiquement exposée ?</Text>
                                <HStack justifyContent="center" mb={4}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.entourageFonctionPolitiquementExposee === 'Non' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, entourageFonctionPolitiquementExposee: 'Non' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.entourageFonctionPolitiquementExposee === 'Non' ? 'green.400' : 'gray.200'}
                                    >
                                        Non
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        colorScheme={formValues.entourageFonctionPolitiquementExposee === 'Oui' ? 'green' : 'gray'}
                                        onClick={() => setFormValues({ ...formValues, entourageFonctionPolitiquementExposee: 'Oui' })}
                                        px={10}
                                        py={6}
                                        textAlign="center"
                                        _hover={{ bg: 'gray.200' }}
                                        borderColor={formValues.entourageFonctionPolitiquementExposee === 'Oui' ? 'green.400' : 'gray.200'}
                                    >
                                        Oui
                                    </Button>
                                </HStack>
                                {errors.entourageFonctionPolitiquementExposee && (
                                    <Alert status="warning" mt={2} backgroundColor="orange.100" borderRadius="md">
                                        <AlertIcon color="orange.400" />
                                        <AlertDescription color="orange.600">Veuillez sélectionner une option pour "Une personne de votre entourage exerce-t-elle ou a-t-elle exercé depuis moins d'un an une fonction politiquement exposée ?".</AlertDescription>
                                    </Alert>
                                )}
                            </FormControl>
                        </VStack>
                    </Box>
                </VStack>

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

            <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <WarningIcon color="orange" mr={2} />
                            Sélection requise
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Veuillez remplir tous les champs avant de continuer. 😊
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    );
};

export default PersonalInfoForm;
