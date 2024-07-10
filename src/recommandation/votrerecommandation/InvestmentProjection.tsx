import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { ChakraProvider, extendTheme, Box, Text, HStack, Icon } from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

const data = {
  labels: [
    '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035',
  ],
  datasets: [
    {
      label: 'Votre horizon',
      data: [24, 36, 50, 66, 84, 104, 126, 150, 176, 204, 234, 266],
      borderColor: '#3182CE',
      backgroundColor: 'rgba(49, 130, 206, 0.5)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Projection basse',
      data: [24, 32, 42, 54, 68, 84, 102, 122, 144, 168, 194, 222],
      borderColor: '#63B3ED',
      backgroundColor: 'rgba(99, 179, 237, 0.3)',
      fill: '+1',
      borderDash: [5, 5],
      tension: 0.4,
    },
    {
      label: 'Projection haute',
      data: [24, 40, 58, 78, 100, 124, 150, 178, 208, 240, 274, 310],
      borderColor: '#2B6CB0',
      backgroundColor: 'rgba(43, 108, 176, 0.3)',
      fill: '-1',
      tension: 0.4,
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Années',
        color: '#718096',
      },
    },
    y: {
      type: 'linear',
      beginAtZero: true,
      title: {
        display: true,
        text: 'Valeur (en k€)',
        color: '#718096',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Projection d'investissement",
    },
  },
};

const InvestmentProjection: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5} maxW="1000px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        <HStack mb={5} alignItems="center">
          <Icon as={FaChartLine} color="blue.400" w={6} h={6} />
          <Text fontSize="lg" fontWeight="bold" color="gray.500">
            Simulation de votre projet
          </Text>
        </HStack>
        <Box height="400px">
          <Line data={data} options={options} />
        </Box>
        <Text fontSize="sm" mt={5} color="gray.500">
          Les supports d’investissement présentent un risque de perte en capital. Les performances passées ne préjugent pas des performances futures.
        </Text>
        <Text fontSize="sm" mt={2} color="gray.700" fontWeight="bold">
          Cette simulation a pour objectif de vous aider dans votre décision. Nous attirons votre attention sur le fait que les performances passées ne préjugent pas des performances futures, ces scénarios ne peuvent pas être garantis. Ces données sont dépourvues de valeur contractuelle. Les chiffres de cette illustration sont nets de tout frais, et bruts de prélèvements sociaux et fiscaux.
        </Text>
        <Text fontSize="sm" mt={2} color="blue.500">
          <a href="https://example.com">À propos de ce graphique</a>
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default InvestmentProjection;
