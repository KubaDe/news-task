import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';

const NoSearchStringMessage: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { isReady } = useRouter();
  useEffect(() => {
    setShowMessage(true);
  }, []);
  if (!showMessage || !isReady) {
    return null;
  }

  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle>Search for news</AlertTitle>
      <AlertDescription>Enter search phrase</AlertDescription>
    </Alert>
  );
};

export default NoSearchStringMessage;
