import { FC } from 'react';
import range from 'lodash/range';
import { Button, Center, Skeleton, VStack } from '@chakra-ui/react';
import NoResultsMessage from '@components/messages/NoResultsMessage';
import RequestErrorMessage from '@components/messages/RequestErrorMessage';
import useSearchContext from '@hooks/useSearchContext';
import Article from './Article';

const ArticleList: FC = () => {
  const { results } = useSearchContext();
  const { articles, size, setSize, isValidating, error, hasMore } = results;

  if (error) {
    return <RequestErrorMessage message={error.cause?.message} />;
  }

  const skeleton = range(2).map(index => (
    <Skeleton key={index} h="130px" w="100%" />
  ));

  if (articles.length === 0 && !isValidating) {
    return <NoResultsMessage />;
  }
  return (
    <>
      <VStack as="ul" spacing={4}>
        {articles.map((article, index) => (
          <Article key={`${index}-${article.url}`} article={article} />
        ))}
        {isValidating && skeleton}
      </VStack>
      {hasMore && (
        <Center mt={3}>
          <Button
            variant="link"
            onClick={() => setSize(size + 1)}
            disabled={isValidating}
          >
            Show more
          </Button>
        </Center>
      )}
    </>
  );
};

export default ArticleList;
