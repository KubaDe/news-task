import { FC } from 'react';
import { useRouter } from 'next/router';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';

const NoResultsMessage: FC = () => {
  const { isReady } = useRouter();
  if (!isReady) {
    return null;
  }
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>No results for current parameters.</AlertTitle>
    </Alert>
  );
};

export default NoResultsMessage;
