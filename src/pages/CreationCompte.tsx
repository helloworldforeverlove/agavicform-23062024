import React, { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    VStack,
    Link,
    Checkbox,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';
import Stepper from '../components/Stepper';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
        yellow: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
});

const CreationCompte: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { uuid } = useUuid();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setIsEmailValid(event.target.value.includes('@'));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setIsPasswordValid(event.target.value.length >= 6);
    };

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleCreateAccount = async () => {
        if (isEmailValid && email !== '' && isPasswordValid && password !== '' && isTermsAccepted) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error creating account:', error);
                setErrorMessage('Erreur lors de la création du compte. Veuillez réessayer.');
                return;
            }

            const user = data?.user;

            if (user) {
                // Link the user's UUID with their Supabase user ID
                const { error: updateError } = await supabase
                    .from('form_responses')
                    .update({ user_id: user.id })
                    .eq('id', uuid);

                if (updateError) {
                    console.error('Error linking UUID with user:', updateError);
                    setErrorMessage('Erreur lors de la liaison de l\'UUID avec l\'utilisateur.');
                } else {
                    // Display success message and redirect
                    setSuccessMessage('Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre adresse.');
                    setTimeout(() => {
                        navigate('/notification-preferences'); // Redirect to the notification preferences page
                    }, 3000);
                }
            }
        } else {
            if (!isEmailValid || email === '') {
                setIsEmailValid(false);
            }
            if (!isPasswordValid || password === '') {
                setIsPasswordValid(false);
            }
            setErrorMessage('Veuillez remplir tous les champs correctement et accepter les conditions d\'utilisation.');
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={1}  />
            <Box p={5} maxW="500px" mx="auto" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={5}>
                    Créez votre compte
                </Text>
                <VStack spacing={4}>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="email"
                            placeholder="Votre e-mail"
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={!isEmailValid}
                        />
                        <InputRightElement width="3rem">
                            <EmailIcon color="gray.500" />
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Votre mot de passe"
                            value={password}
                            onChange={handlePasswordChange}
                            isInvalid={!isPasswordValid}
                        />
                        <InputRightElement width="3rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Checkbox
                        isChecked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    >
                        J'accepte les{' '}
                        <Link color="blue.500" href="https://www.Agavic.fr/politique-de-confidentialite">
                            conditions d'utilisation et la politique de confidentialité
                        </Link>
                    </Checkbox>
                    <Button
                        colorScheme="blue"
                        width="100%"
                        onClick={handleCreateAccount}
                        isDisabled={!isEmailValid || email === '' || !isPasswordValid || password === '' || !isTermsAccepted}
                    >
                        Créer un compte
                    </Button>
                </VStack>
                {errorMessage && (
                    <Alert status="error" mt={4} borderRadius="md">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErrorMessage(null)} />
                    </Alert>
                )}
                {successMessage && (
                    <Alert status="success" mt={4} borderRadius="md">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>Succès</AlertTitle>
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccessMessage(null)} />
                    </Alert>
                )}
            </Box>
        </ChakraProvider>
    );
};

export default CreationCompte;
