import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from '@components/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async url => {
          const res = await fetch(url);
          if (!res.ok) {
            const error = new Error(String(res.status));
            error.cause = await res.json();
            throw error;
          }
          return res.json();
        },
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}
