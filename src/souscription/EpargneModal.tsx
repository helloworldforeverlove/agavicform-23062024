import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    HStack,
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

// Remove the CloseButton import
// import { CloseButton } from '@chakra-ui/react';

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

const EpargneModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <ChakraProvider theme={theme}>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                                onClick={onClose}
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
        </ChakraProvider>
    );
};

export default EpargneModal;
