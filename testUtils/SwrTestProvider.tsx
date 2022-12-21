import { FC, ReactNode } from 'react';
import { BareFetcher, SWRConfig } from 'swr/_internal';

const SwrTestProvider: FC<{ children: ReactNode; fetcher: BareFetcher }> = ({
  children,
  fetcher,
}) => (
  <SWRConfig value={{ provider: () => new Map(), fetcher }}>
    {children}
  </SWRConfig>
);
export default SwrTestProvider;
