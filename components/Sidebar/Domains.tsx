import { FC } from 'react';
import { DeleteIcon, NotAllowedIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import useSearchContext from '@hooks/useSearchContext';

const Domains: FC = () => {
  const { domainFilter } = useSearchContext();

  return (
    <Card backgroundColor="white" w="100%">
      <CardHeader borderBottom="1px" borderColor="gray.300">
        <HStack spacing={0}>
          <Heading as="h2" size="md">
            Domains
          </Heading>
          <Spacer />
          <IconButton
            aria-label="remove domain filters"
            icon={<RepeatIcon />}
            variant="link"
            colorScheme="gray"
            onClick={domainFilter.clearDomainFilter}
          />
          <IconButton
            aria-label="clear domains cache"
            icon={<NotAllowedIcon />}
            variant="link"
            colorScheme="gray"
            onClick={domainFilter.domainsCache?.clearDomains}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          {domainFilter.domainsCache?.domains?.map(domain => (
            <FormControl as={HStack} alignItems="center" key={domain}>
              <IconButton
                aria-label="remove topic"
                variant="link"
                size="xs"
                colorScheme="gray"
                icon={<DeleteIcon />}
                onClick={() => domainFilter.domainsCache?.removeDomain(domain)}
                disabled={domainFilter.state?.includes(domain)}
              />
              <FormLabel
                mb="0"
                htmlFor={`domain-${domain}`}
                maxW="calc(100% - 100px)"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {domain}
              </FormLabel>
              <Spacer />
              <Switch
                id={`domain-${domain}`}
                isChecked={
                  domainFilter.state?.includes(domain) ||
                  !domainFilter.state ||
                  domainFilter.state?.length === 0
                }
                onChange={() => domainFilter.toggleDomainFilterItem(domain)}
              />
            </FormControl>
          ))}
          {!domainFilter.domainsCache?.domains?.length && (
            <Center>
              <Text>Filter options are empty</Text>
            </Center>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Domains;
