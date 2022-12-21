import { FC } from 'react';
import dynamic from 'next/dynamic';
import { VStack } from '@chakra-ui/react';

const Domains = dynamic(() => import('./Domains'), {
  ssr: false,
});

const Topics = dynamic(() => import('./Topics'), {
  ssr: false,
});

const Sidebar: FC = () => {
  return (
    <VStack>
      <Topics />
      <Domains />
    </VStack>
  );
};

export default Sidebar;
