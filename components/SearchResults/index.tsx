import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import ArticleList from '@components/SearchResults/ArticleList';
import NoSearchStringMessage from '@components/messages/NoSearchStringMessage';
import useSearchContext from '@hooks/useSearchContext';

const SearchResults: FC = () => {
  const { search } = useSearchContext();
  return (
    <Box mt={6}>
      {search.state ? <ArticleList /> : <NoSearchStringMessage />}
    </Box>
  );
};

export default SearchResults;
