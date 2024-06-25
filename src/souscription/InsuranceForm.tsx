import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack, Link } from '@chakra-ui/react';

const InsuranceForm: React.FC = () => {
  return (
    <Box maxW="md" mx="auto" p={4}>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Clause Bénéficiaire de Votre Contrat d'Assurance-Vie
      </Text>

      <Text mb={4}>
        L'adhésion à un contrat d'assurance-vie permet la désignation de bénéficiaire(s) qui percevront le capital en cas de décès de l'assuré. Cette désignation ne sera modifiable qu'auprès de Yomoni après un processus d'authentification sécurisé.
      </Text>
      
      <Text mb={4}>
        La désignation du bénéficiaire est un acte fondamental. Nous vous invitons à porter une attention particulière à cette désignation, sans oublier de la faire évoluer pour tenir compte de vos éventuels changements de situation.
      </Text>

      <Text mb={4}>
        Une désignation maîtrisée et correctement rédigée vous permet de préparer au mieux votre succession et de bénéficier d'un régime civil et fiscal spécifique particulièrement favorable.
      </Text>

      <Text mb={4}>
        En savoir plus sur le fonctionnement de la <Link color="teal.500" href="#">clause générale</Link> et sur les bonnes pratiques de rédaction d'une <Link color="teal.500" href="#">clause libre</Link>.
      </Text>

      <Text mb={4}>
        En cas de décès, vous souhaitez que le(s) bénéficiaire(s) du contrat soit(ent) :
      </Text>

      <RadioGroup defaultValue="children">
        <Stack spacing={4}>
          <Radio value="spouse">
            Votre conjoint non séparé de corps ou la personne avec laquelle vous avez conclu un Pacte Civil de Solidarité (Pacs) en vigueur à la date du décès, à défaut vos enfants nés ou à naître, vivants ou représentés par parts égales, à défaut vos héritiers en proportion de leurs parts héréditaires y compris les légataires universels.
          </Radio>
          <Radio value="children">
            Vos enfants, nés ou à naître, vivants ou représentés, par parts égales entre eux, à défaut vos héritiers.
          </Radio>
          <Radio value="other">
            Un ou plusieurs autre(s) bénéficiaire(s) à détailler
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default InsuranceForm;
