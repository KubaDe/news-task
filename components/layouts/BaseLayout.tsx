import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';

const BaseLayout: FC<{ children: ReactNode; sidebar: ReactNode }> = ({
  children,
  sidebar,
}) => {
  useEffect(() => {
    if (typeof window !== undefined && !process.env.NEXT_PUBLIC_API_KEY) {
      alert('Please add NEXT_PUBLIC_API_KEY to ".env.local" file');
    }
  }, []);

  return (
    <>
      <Head>
        <title>News Task</title>
        <meta name="description" content="Recruitment task - News" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        as="main"
        backgroundColor="gray.200"
        minH="100vh"
        justifyContent="center"
        p={6}
      >
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="center"
          maxW="1440px"
          flex="1 1"
          gap={4}
        >
          <Box w={{ base: '100%', md: '300px' }} as="aside">
            {sidebar}
          </Box>
          <Box flex="1 1">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default BaseLayout;
