import { FC } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';

const RequestErrorMessage: FC<{ message?: string }> = ({ message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Server problem.</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default RequestErrorMessage;
