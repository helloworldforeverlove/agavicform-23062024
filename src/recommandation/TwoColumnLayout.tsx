// TwoColumnLayout.tsx
import React from 'react';
import { Box, SimpleGrid, Spacer } from '@chakra-ui/react';
import RiskProfile from './votrerecommandation/RiskProfile';
import PatriLifeRecommendation from './votrerecommandation/PatriLifeRecommendation';
import QuestionsBox from './votrerecommandation/QuestionsBox';
import RiskDisclaimer from './votrerecommandation/RiskDisclaimer';

const TwoColumnLayout: React.FC = () => {
    return (
        <SimpleGrid columns={2} spacing={10} p={5}>
            <Box>
                <PatriLifeRecommendation />
                <QuestionsBox />
                <Spacer p={5} />
                <RiskDisclaimer />
            </Box>
            <Box>
                <RiskProfile />
            </Box>
        </SimpleGrid>
    );
};

export default TwoColumnLayout;
