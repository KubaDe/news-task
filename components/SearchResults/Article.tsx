import { FC } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Img,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Data as ArticlesListData } from '@api/useNewsList';

const Article: FC<{ article: ArticlesListData['articles'][number] }> = ({
  article,
}) => {
  return (
    <LinkBox as="li" listStyleType="none" w="100%">
      <Card>
        <CardHeader pb={0}>
          <LinkOverlay
            href={article.url}
            target="_blank"
            fontWeight={700}
            fontSize="lg"
          >
            {article.title}
          </LinkOverlay>
        </CardHeader>
        <CardBody>
          <Stack
            spacing={4}
            direction={{ base: 'column', md: 'row' }}
            alignItems="center"
          >
            {article.urlToImage && (
              <Img
                w="160px"
                h="100px"
                htmlWidth="160px"
                htmlHeight="100px"
                src={article.urlToImage}
                alt={article.title}
                objectFit="cover"
              />
            )}
            <Text noOfLines={3}>{article.description}</Text>
          </Stack>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

export default Article;
