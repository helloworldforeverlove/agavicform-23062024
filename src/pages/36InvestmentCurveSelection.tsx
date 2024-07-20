import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  SimpleGrid,
  ChakraProvider,
  extendTheme,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';

interface Option {
  value: string;
  label: string;
  image: string; // URL de l'image de la courbe
}

const theme = extendTheme({
  colors: {
    blue: {
      500: '#3182CE',
    },
    gray: {
      200: '#EDF2F7',
      500: '#718096',
    },
  },
  components: {
    Button: {
      baseStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
  },
});

const InvestmentCurveSelection: React.FC = () => {
  const [selectedCurve, setSelectedCurve] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { updateResponse, getResponse } = useUuid();

  useEffect(() => {
    const fetchResponse = async () => {
      const step111 = await getResponse(111);
      setSelectedCurve(step111 || '');
      setLoading(false);
    };

    fetchResponse();
  }, [getResponse]);

  const handleOptionChange = async (value: string) => {
    setSelectedCurve(value);
    await updateResponse(111, value);
  };

  const handleNext = () => {
    navigate('/next-step'); // Replace with the actual next step route
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous step
  };

  const options: Option[] = [
    { value: 'A', label: 'Courbe A', image: '/path/to/imageA.png' },
    { value: 'B', label: 'Courbe B', image: '/path/to/imageB.png' },
    { value: 'C', label: 'Courbe C', image: '/path/to/imageC.png' },
    { value: 'D', label: 'Courbe D', image: '/path/to/imageD.png' },
  ];

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW="1000px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Parmi ces courbes de rendement, quelle est la courbe d'investissement avec laquelle vous sentez le plus à l'aise ?
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <SimpleGrid columns={[1, 2, 4]} spacing={4}>
              {options.map((option) => (
                <Box
                  key={option.value}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  borderColor={selectedCurve === option.value ? 'blue.500' : 'gray.200'}
                  boxShadow={selectedCurve === option.value ? '0 0 10px rgba(0, 0, 255, 0.5)' : 'none'}
                  transition="all 0.2s"
                >
                  <Box p={4} textAlign="center">
                    <Text fontWeight="bold" mb={2} color={selectedCurve === option.value ? 'blue.500' : 'gray.500'}>
                      {option.label}
                    </Text>
                    <Image src={option.image} alt={option.label} mb={2} />
                    <Button
                      width="100%"
                      variant={selectedCurve === option.value ? 'solid' : 'outline'}
                      colorScheme={selectedCurve === option.value ? 'blue' : 'gray'}
                      onClick={() => handleOptionChange(option.value)}
                    >
                      Je choisis
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </FormControl>
          <Box display="flex" justifyContent="space-between">
            <Button colorScheme="gray" variant="outline" onClick={handleBack} px={6} py={6} size="lg">
              Retour
            </Button>
            <Button colorScheme="yellow" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>
              Suivant
            </Button>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default InvestmentCurveSelection;
