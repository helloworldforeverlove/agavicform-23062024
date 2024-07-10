import React from 'react';
import { Box, Flex, Text, Circle, HStack, Progress } from '@chakra-ui/react';

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  currentStep: number;
  currentSubStep: number;
  totalSubSteps: number;
  title: string;
}

const steps: Step[] = [
  { number: 1, label: 'Projet' },
  { number: 2, label: 'Recommandation' },
  { number: 3, label: 'Souscription' },
  { number: 4, label: 'Justificatifs' },
  { number: 5, label: 'Signature' },
];

const StepperWithSubStepCounter: React.FC<StepperProps> = ({ currentStep, currentSubStep, totalSubSteps, title }) => {
  const progressPercentage = (currentSubStep / totalSubSteps) * 100;

  return (
    <Box bg="white" borderRadius="md" boxShadow="md" padding="4" width="100%" mb={50}>
      <HStack spacing="4" justify="center" mb="4" wrap="wrap">
        {steps.map((step) => (
          <Flex key={step.number} align="center">
            <Circle
              size="30px"
              bg={currentStep === step.number ? '#602A1D' : 'white'}
              color={currentStep === step.number ? 'white' : '#602A1D'}
              border="2px solid"
              borderColor="#602A1D"
            >
              {step.number}
            </Circle>
            <Text
              ml="2"
              color={currentStep === step.number ? '#602A1D' : 'gray.500'}
              fontWeight={currentStep === step.number ? 'bold' : 'normal'}
            >
              {step.label}
            </Text>
            {step.number < steps.length && (
              <Box
                w="50px"
                h="2px"
                bg={currentStep > step.number ? '#602A1D' : 'gray.200'}
                mx="2"
              />
            )}
          </Flex>
        ))}
      </HStack>
      <Flex 
        spacing={400} justify="center"
        align="center" 
        mx={{ base: "2", md: "4" }} 
        direction={{ base: "column", md: "row" }} 
        textAlign={{ base: "center", md: "left" }}
      >
        <Text fontWeight="bold" color="gray.500" mb={{ base: "2", md: "0" }} pr={{ base: "0", md: "250" }}>
          {title}
        </Text>
        <Flex align="center" pl={{ base: "0", md: "250" }}>
          <Text fontWeight="bold" color="gray.500" mr="2">
            Question {currentSubStep}/{totalSubSteps}
          </Text>
          <Progress value={progressPercentage} size="sm" colorScheme="yellow" width="100px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default StepperWithSubStepCounter;
