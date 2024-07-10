import React from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Collapse,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    orange: '#FF8C00',
    green: {
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
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: 'gray.100',
        },
      },
    },
  },
});

const data = {
  labels: ['Obligations', 'Actions', 'Autres'],
  datasets: [
    {
      data: [15, 15, 70],
      backgroundColor: ['#38A169', '#3182CE', '#CBD5E0'],
      hoverBackgroundColor: ['#48BB78', '#63B3ED', '#E2E8F0'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
  },
};

const AssetAllocation: React.FC = () => {
  const [isObligationsOpen, setIsObligationsOpen] = React.useState(false);
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const [isOthersOpen, setIsOthersOpen] = React.useState(false);

  const toggleObligations = () => setIsObligationsOpen(!isObligationsOpen);
  const toggleActions = () => setIsActionsOpen(!isActionsOpen);
  const toggleOthers = () => setIsOthersOpen(!isOthersOpen);

  const allocationSections = [
    {
      label: 'Obligations',
      value: '15,0%',
      color: '#38A169',
      subtext: 'Actifs à risques modérés',
      isOpen: isObligationsOpen,
      toggle: toggleObligations,
      details: (
        <>
          <Text>7,5% Obligations zone Euro diversifiées</Text>
          <Text>4,9% Bons du Trésor zone Euro</Text>
          <Text>2,6% Obligations d'entreprises zone Euro</Text>
        </>
      ),
    },
    {
      label: 'Actions',
      value: '15,0%',
      color: '#3182CE',
      subtext: 'Actifs risqués',
      isOpen: isActionsOpen,
      toggle: toggleActions,
      details: (
        <>
          <Text>3,5% Actions États-Unis</Text>
          <Text>3,4% Actions Monde couvertes</Text>
          <Text>2,5% Actions États-Unis couvertes</Text>
          <Text>2,0% Actions Monde</Text>
          <Text>1,9% Actions Pays Émergents</Text>
          <Text>0,6% Actions Europe</Text>
          <Text>0,6% Actions Europe couvertes</Text>
          <Text>0,3% Actions Japon</Text>
          <Text>0,2% Actions Japon couvertes</Text>
        </>
      ),
    },
    {
      label: 'Autres',
      value: '70,0%',
      color: '#CBD5E0',
      subtext: '',
      isOpen: isOthersOpen,
      toggle: toggleOthers,
      details: (
        <>
          <Text>70,0% Fonds Euro</Text>
        </>
      ),
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5} mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        <HStack mb={4}>
          <Box as="span" mr={2} p={2} bg="blue.400" color="white" borderRadius="md">
            <Icon as={FaChevronDown} />
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Répartition par type d'actifs
          </Text>
        </HStack>
        <HStack alignItems="start" spacing={6}>
          <Box w="40%">
            <Doughnut data={data} options={options} width={150} height={150} />
          </Box>
          <VStack w="60%" align="stretch" spacing={4}>
            {allocationSections.map((section) => (
              <Box key={section.label}>
                <HStack
                  justifyContent="space-between"
                  mb={2}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                  onClick={section.toggle}
                >
                  <HStack>
                    <Box width="12px" height="12px" bg={section.color} borderRadius="md" />
                    <Text fontWeight="bold" color={section.color}>
                      {section.value} {section.label}
                    </Text>
                    <Text color="gray.500">{section.subtext}</Text>
                  </HStack>
                  <IconButton
                    icon={section.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    variant="ghost"
                    aria-label={`Toggle ${section.label}`}
                    onClick={section.toggle}
                  />
                </HStack>
                <Collapse in={section.isOpen} animateOpacity>
                  <VStack align="start" pl={4} spacing={1}>
                    {section.details}
                  </VStack>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default AssetAllocation;
