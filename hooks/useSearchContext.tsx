import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import useNewsList from '@api/useNewsList';
import useDomainFilter, { DomainFilter } from '@hooks/useDomainFilter';
import useSearch, { Search } from '@hooks/useSearch';
import useTopicFilter, { TopicFilter } from '@hooks/useTopicsFilter';

type SearchContextValue = {
  search: Search;
  domainFilter: DomainFilter;
  topicFilter: TopicFilter;
  results: ReturnType<typeof useNewsList>;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const domainFilter = useDomainFilter();
  const topicFilter = useTopicFilter();
  const search = useSearch();
  const results = useNewsList(
    {
      q: search.state,
      domains: domainFilter.state,
    },
    {
      onNewData: newData => {
        domainFilter.domainsCache?.mergeNewDomains(newData.domains);
        topicFilter.topicsCache?.pushNewTopic(newData.q);
      },
    },
  );

  const searchContextValue = useMemo<SearchContextValue>(
    () => ({
      search,
      domainFilter,
      topicFilter,
      results,
    }),
    [search, domainFilter, topicFilter, results],
  );

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const contextValue = useContext(SearchContext);
  if (!contextValue) {
    throw new Error('Missing SearchContextProvider');
  }
  return contextValue;
};

export default useSearchContext;
