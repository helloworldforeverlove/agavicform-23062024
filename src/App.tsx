// src/App.tsx
import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Routes from './routes/Routes';
import { UuidProvider } from './context/UuidContext';
import AccompagnementSurMesure from './recommandation/modal/AccompagnementSurMesure';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
    },
});

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ChakraProvider theme={theme}>
            <UuidProvider>
                <Router>
                    <Header openModal={openModal} />
                    <Banner />
                    <Routes />
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <AccompagnementSurMesure onClose={closeModal} />
                        </ModalContent>
                    </Modal>
                </Router>
            </UuidProvider>
        </ChakraProvider>
    );
};

export default App;
