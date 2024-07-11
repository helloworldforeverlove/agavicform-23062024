import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, CloseButton, Box, Link } from '@chakra-ui/react';

const Banner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Alert status="warning" bg="#FFFAE5" color="#D69E2E" borderRadius="md" padding="4" maxW="100vw" overflow="hidden">
      {isSmallScreen ? (
        <Box textAlign="center">
          <AlertDescription>
            Vous avez déjà réalisé une simulation ou initié une ouverture de compte?{' '}
            <Link href="#" color="#D69E2E" fontWeight="bold">Reprenez votre parcours ici.</Link>
            {' '}Déjà client PatriLife ?{' '}
            <Link href="#" color="#D69E2E" fontWeight="bold">Connectez-vous en cliquant ici.</Link>
          </AlertDescription>
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          <AlertDescription flex="1">
            Vous avez déjà réalisé une simulation ou initié une ouverture de compte?{' '}
            <Link href="#" color="#D69E2E" fontWeight="bold">Reprenez votre parcours ici.</Link>
            {' '}Déjà client PatriLife ?{' '}
            <Link href="#" color="#D69E2E" fontWeight="bold">Connectez-vous en cliquant ici.</Link>
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" color="#D69E2E" onClick={handleClose} />
        </Box>
      )}
    </Alert>
  );
};

export default Banner;
