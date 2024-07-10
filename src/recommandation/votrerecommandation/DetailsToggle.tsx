import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

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

const DetailsToggle: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <ChakraProvider theme={theme}>
      <VStack align="center" mt={4}>
        <HStack
          as="button"
          onClick={toggleDetails}
          p={2}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
          cursor="pointer"
          _hover={{ bg: 'gray.50' }}
        >
          <IconButton
            icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
            aria-label="Toggle Details"
            variant="ghost"
          />
          <Text fontSize="sm" color="blue.400">
            Plus de détails ci-dessous
          </Text>
        </HStack>
        <Collapse in={showDetails} animateOpacity>
          <Box
            p={4}
            mt={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            bg="gray.50"
            w="full"
          >
            <Text>Here are more details...</Text>
          </Box>
        </Collapse>
      </VStack>
    </ChakraProvider>
  );
};

export default DetailsToggle;
