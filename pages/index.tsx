import { Card, CardBody } from '@chakra-ui/react';
import SearchBox from '@components/SearchBox';
import SearchResults from '@components/SearchResults';
import Sidebar from '@components/Sidebar';
import BaseLayout from '@components/layouts/BaseLayout';
import { SearchContextProvider } from '@hooks/useSearchContext';

const Page = () => {
  return (
    <SearchContextProvider>
      <BaseLayout sidebar={<Sidebar />}>
        <Card backgroundColor="white">
          <CardBody>
            <SearchBox />
            <SearchResults />
          </CardBody>
        </Card>
      </BaseLayout>
    </SearchContextProvider>
  );
};

export default Page;
