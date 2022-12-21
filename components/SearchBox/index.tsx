import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import useSearchForm from './useSearchForm';

const SearchBox: FC = () => {
  const { errors, register, onSubmit, handleSubmit } = useSearchForm();
  return (
    <VStack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.search}>
        <Input
          type="text"
          placeholder="Search phrase"
          {...register('search', {
            maxLength: { value: 100, message: 'Maximum length should be 100' },
          })}
          autoFocus
        />
        <ErrorMessage
          errors={errors}
          name="search"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>
    </VStack>
  );
};

export default SearchBox;
