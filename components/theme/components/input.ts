import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const variantFilled = definePartsStyle({
  field: {
    borderRadius: 3,
    border: '1px',
    borderColor: 'gray.300',
  },
});

const variants = {
  filled: variantFilled,
};

export const inputTheme = defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: 'filled',
    size: 'lg',
  },
});
