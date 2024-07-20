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
  Text,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Option {
  value: string;
  label: string;
  data: number[]; // Données de la courbe
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
    { value: 'A', label: 'Courbe A', data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { value: 'B', label: 'Courbe B', data: [0, 0.5, 1, 1.5, 2, 1.5, 1, 1.5, 2, 2.5, 3] },
    { value: 'C', label: 'Courbe C', data: [0, -0.5, 0, 0.5, 1, 0.5, 0, 0.5, 1, 1.5, 2] },
    { value: 'D', label: 'Courbe D', data: [0, -1, 0, 1, 2, 1, 0, -1, 0, 1, 2] },
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
                  onClick={() => handleOptionChange(option.value)}
                  cursor="pointer"
                >
                  <Box p={4} textAlign="center">
                    <Text fontWeight="bold" mb={2} color={selectedCurve === option.value ? 'blue.500' : 'gray.500'}>
                      {option.label}
                    </Text>
                    <Box height="200px">
                      <Line
                        data={{
                          labels: Array.from({ length: option.data.length }, (_, i) => i.toString()),
                          datasets: [
                            {
                              data: option.data,
                              borderColor: selectedCurve === option.value ? 'blue' : 'gray',
                              borderWidth: 2,
                              fill: false,
                              tension: 0.1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              display: false,
                            },
                            y: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </Box>
                    <Button
                      width="100%"
                      variant={selectedCurve === option.value ? 'solid' : 'outline'}
                      colorScheme={selectedCurve === option.value ? 'blue' : 'gray'}
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
