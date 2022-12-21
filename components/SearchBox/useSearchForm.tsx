import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSearchContext from '@hooks/useSearchContext';

type QuerySearchFormValues = {
  search?: string;
};

const useSearchForm = () => {
  const { search } = useSearchContext();
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<QuerySearchFormValues>({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    search.state &&
      reset(
        {
          search: search.state,
        },
        { keepDirty: true },
      );
  }, [reset, search.state]);

  const onSubmit = useCallback<(values: QuerySearchFormValues) => void>(
    values => {
      isValid && search.setSearch(values.search);
    },
    [isValid, search],
  );

  useEffect(() => {
    const subscription = watch(values => {
      onSubmit(values);
    });
    return () => subscription.unsubscribe();
  }, [onSubmit, watch]);

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
  };
};

export default useSearchForm;
