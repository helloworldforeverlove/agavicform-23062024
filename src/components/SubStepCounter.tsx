import React from 'react';
import { Box, Flex, Text, Progress } from '@chakra-ui/react';

interface SubStepCounterProps {
  currentSubStep: number;
  totalSubSteps: number;
  title: string; // New prop for the title
}

const SubStepCounter: React.FC<SubStepCounterProps> = ({ currentSubStep, totalSubSteps, title }) => {
  const progressPercentage = (currentSubStep / totalSubSteps) * 100;

  return (
    <Box bg="white" borderRadius="md" boxShadow="md" padding="4" width="100%">
      <Flex justify="space-between" align="center" mb="2">
        <Text fontWeight="bold" color="gray.500">{title}</Text>
        <Flex align="center">
          <Text fontWeight="bold" color="gray.500" mr="2">Question {currentSubStep}/{totalSubSteps}</Text>
          <Progress value={progressPercentage} size="sm" colorScheme="yellow" width="100px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SubStepCounter;
