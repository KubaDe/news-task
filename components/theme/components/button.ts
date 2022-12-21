import { defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 6,
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'blue',
  },
});
