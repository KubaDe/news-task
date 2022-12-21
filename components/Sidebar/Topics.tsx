import { FC } from 'react';
import NextLink from 'next/link';
import { DeleteIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import useSearchContext from '@hooks/useSearchContext';

const Topics: FC = () => {
  const { topicFilter, search } = useSearchContext();
  return (
    <Card backgroundColor="white" w="100%">
      <CardHeader borderBottom="1px" borderColor="gray.300">
        <HStack>
          <Heading as="h2" size="md">
            Topics
          </Heading>
          <Spacer />
          <IconButton
            aria-label="remove domain filters"
            icon={<NotAllowedIcon />}
            variant="link"
            colorScheme="gray"
            onClick={topicFilter.topicsCache?.clearTopics}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          {topicFilter.topicsCache?.topics?.map(topic => (
            <FormControl
              as={HStack}
              alignItems="center"
              key={topic}
              overflow="hidden"
            >
              <IconButton
                aria-label="remove topic"
                variant="link"
                size="xs"
                colorScheme="gray"
                icon={<DeleteIcon />}
                onClick={() => topicFilter.topicsCache?.removeTopic(topic)}
              />
              <NextLink href={search.getSearchUrl(topic)}>
                <Button variant="link" as="span" display="block">
                  {topic}
                </Button>
              </NextLink>
            </FormControl>
          ))}
          {!topicFilter.topicsCache?.topics?.length && (
            <Center>
              <Text>Filter options are empty</Text>
            </Center>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Topics;
