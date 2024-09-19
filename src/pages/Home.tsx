import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Flex align="center" justify="center" height="100vh" direction="column">
      <Heading mb={6}>Bienvenue chez EPARGNE+</Heading>
      <Link to="/quel-est-votre-projet-d-investissement">
        <Button colorScheme="yellow" size="lg">Commence ton projet</Button>
      </Link>
    </Flex>
  );
};

export default Home;
