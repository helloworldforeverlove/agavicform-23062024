import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Progress, VStack, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';
import Stepper from '../components/Stepper';

interface Response {
  step1: string;
  step4: number;
  step9: string;
  step10: string;
  step13: number;
  step14: number;
  step15: string;
  step16: string;
  step17: string;
  step18: string;
  step19: string;
  step20: string;
  step21: string;
  step22: string;
  step23: string;
  step24: string;
}

const calculateRiskScore = (response: Response): number => {
  let score = 0;

  // Normalize each step's response to a 0-1 scale
  const step1Scores: { [key: string]: number } = {
    fructifier: 1,
    epargner: 0,
    achat: 0.625,
    retraite: 0.375,
    patrimoine: 0.5,
    compte: 0.75,
    tresorerie: 0.875,
  };
  score += step1Scores[response.step1];

  score += Math.min(response.step4 / 30, 1); // Normalize step4 to 0-1 based on a maximum of 30 years

  const step9Scores: { [key: string]: number } = {
    lessThan30000: 0,
    '30000to45000': 0.25,
    '45000to60000': 0.5,
    '60000to100000': 0.75,
    '100000to150000': 0.875,
    moreThan150000: 1,
  };
  score += step9Scores[response.step9];

  const step10Scores: { [key: string]: number } = {
    oui: 1,
    non: 0.5,
  };
  score += step10Scores[response.step10];

  score += Math.min(response.step13 / 1000000, 1); // Normalize step13 to 0-1 based on a max value of 1,000,000
  score += Math.min(response.step14 / 10000, 1); // Normalize step14 to 0-1 based on a max value of 10,000

  const step15And16Scores: { [key: string]: number } = {
    certainementPas: 0,
    probablementPas: 0.25,
    probablement: 0.5,
    tresProbablement: 1,
  };
  score += step15And16Scores[response.step15];
  score += step15And16Scores[response.step16];

  const step17Scores: { [key: string]: number } = {
    oui: 1,
    non: 0.5,
  };
  score += step17Scores[response.step17];

  const perceptionScores: { [key: string]: number } = {
    vrai: 1,
    faux: 0,
    jeNeSaisPas: 0.5,
  };
  score += perceptionScores[response.step18];
  score += perceptionScores[response.step19];
  score += perceptionScores[response.step20];

  const step21Scores: { [key: string]: number } = {
    noLoss: 0,
    max10: 0.33,
    max20: 0.66,
    moreThan20: 1,
  };
  score += step21Scores[response.step21];

  const gainLossScores: { [key: string]: number } = {
    gain5000loss2000: 1,
    gain2000loss1000: 0.75,
    gain1000loss400: 0.5,
    gain500noloss: 0.25,
    gain20loss5: 0.25,
    gain30loss10: 0.5,
    gain50loss15: 0.75,
    gain70lossMore15: 1,
  };
  score += gainLossScores[response.step22];
  score += gainLossScores[response.step23];

  const investmentActionScores: { [key: string]: number } = {
    reinvest: 1,
    wait: 0.75,
    sellPart: 0.5,
    sellAll: 0.25,
    dontKnow: 0.25,
  };
  score += investmentActionScores[response.step24];

  // Average the score
  const numberOfSteps = Object.keys(response).length;
  const averageScore = score / numberOfSteps;

  // Normalize to 1-10 scale
  const normalizedScore = Math.round(averageScore * 10);

  return Math.max(1, Math.min(normalizedScore, 10)); // Ensure score is between 1 and 10
};

const colorMap: { [key: number]: string } = {
  1: 'yellow.400',
  2: 'yellow.500',
  3: 'yellow.300',
  4: 'yellow.400',
  5: 'yellow.500',
  6: 'red.200',
  7: 'red.300',
  8: 'red.400',
  9: 'red.500',
  10: 'red.600',
};

const CombinedRiskScoreComponent: React.FC = () => {
  const { uuid } = useUuid();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [colorCode, setColorCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select(
          'step1, step4, step9, step10, step13, step14, step15, step16, step17, step18, step19, step20, step21, step22, step23, step24'
        )
        .eq('id', uuid)
        .single();

      if (error) {
        setError('Error fetching responses');
        console.error('Error fetching responses:', error);
        return;
      }

      if (data) {
        const parsedData: Response = {
          step1: data.step1,
          step4: parseInt(data.step4, 10),
          step9: data.step9,
          step10: data.step10,
          step13: parseInt(data.step13, 10),
          step14: parseInt(data.step14, 10),
          step15: data.step15,
          step16: data.step16,
          step17: data.step17,
          step18: data.step18,
          step19: data.step19,
          step20: data.step20,
          step21: data.step21,
          step22: data.step22,
          step23: data.step23,
          step24: data.step24,
        };

        setResponse(parsedData);
      }
    };

    fetchResponses();
  }, [uuid]);

  useEffect(() => {
    if (response) {
      const score = calculateRiskScore(response);
      const color = colorMap[score as keyof typeof colorMap]; // Cast score to string to access colorMap
      setRiskScore(score);
      setColorCode(color);

      // Update the risk score and color code in the database
      const updateRiskScore = async (score: number, color: string) => {
        const { error } = await supabase
          .from('form_responses')
          .update({ risk_score: score, color_code: color })
          .eq('id', uuid);

        if (error) {
          setError('Error updating risk score');
          console.error('Error updating risk score:', error);
        } else {
          // Navigate to /recommandation after 1 second
          setTimeout(() => {
            navigate('/recommandation');
          }, 1000);
        }
      };

      updateRiskScore(score, color);
    }
  }, [response, uuid, navigate]);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (riskScore === null || colorCode === null) {
    return <Text>Loading...</Text>;
  }

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
});

  return (
    <ChakraProvider theme={theme}>
      <Stepper currentStep={2} />
      <Box mt={5} p={5} pt={10} maxW="1000px" mx="auto" textAlign="center" borderRadius="md" boxShadow="md" bg="white">
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Votre Score de Risque
          </Text>
          <Flex align="center" justify="center">
            <Text fontSize="2xl" fontWeight="bold" color={colorCode}>
              {riskScore}
            </Text>
            <Text fontSize="lg" ml={2}>/ 10</Text>
          </Flex>
          <Progress colorScheme={colorCode.split('.')[0]} value={(riskScore / 10) * 100} size="lg" w="100%" />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default CombinedRiskScoreComponent;
