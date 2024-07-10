// src/pages/Recommandation.tsx
import React, { useEffect } from 'react';
import { ChakraProvider, extendTheme, Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import GeographicDiversification from './details/GeographicDiversification';
import TwoColumnLayout from './TwoColumnLayout';
import Stepper from '../components/Stepper';
import DetailsToggle from './votrerecommandation/DetailsToggle';
import AssetAllocation from './details/AssetAllocation';
import InvestmentProjection from './votrerecommandation/InvestmentProjection';
import LeaderInfo from './votrerecommandation/LeaderInfo';
import InvestmentInfo from './votrerecommandation/InvestmentInfo';
import ArbitrationMandate from './votrerecommandation/ArbitrationMandate';
import FeesInfo from './votrerecommandation/FeesInfo';
import RegulatoryInfo from './votrerecommandation/RegulatoryInfo';
import ActionButtons from './votrerecommandation/ActionButtons';
import AccompagnementSurMesure from '../recommandation/modal/AccompagnementSurMesure';

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
    fonts: {
        body: 'Arial, sans-serif',
        heading: 'Arial, sans-serif',
    },
});

const Recommandation: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={2} />
            <Box mt={5} p={5} pt={10} maxW="1000px" mx="auto" textAlign="center" borderRadius="md" boxShadow="md" bg="white">
                <TwoColumnLayout />
                <DetailsToggle />
                <GeographicDiversification />
                <AssetAllocation />
                <InvestmentProjection />
                <LeaderInfo />
                <InvestmentInfo />
                <ArbitrationMandate />
                <FeesInfo />
                <RegulatoryInfo />
                <ActionButtons />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Accompagnement sur mesure
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        <AccompagnementSurMesure onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default Recommandation;
