import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import uniq from 'lodash/uniq';
import xor from 'lodash/xor';
import { useRouter } from 'next/router';

export type DomainFilter = {
  state?: string[];
  domainsCache?: ReturnType<typeof useDomainsCache>;
  toggleDomainFilterItem: (filterItem: string) => void;
  clearDomainFilter: () => void;
};

const useDomainsCache = () => {
  const [domains, setDomains] = useLocalStorage<string[]>('domains', []);
  const mergeNewDomains = useCallback(
    (newDomains: string[]) => {
      setDomains(uniq([...(domains || []), ...newDomains]).sort());
    },
    [domains, setDomains],
  );
  const removeDomain = useCallback(
    (domainToRemove: string) => {
      setDomains(domains?.filter(domain => domain !== domainToRemove));
    },
    [domains, setDomains],
  );

  const clearDomains = useCallback(() => {
    setDomains([]);
  }, [setDomains]);

  return useMemo(
    () => ({ domains, mergeNewDomains, removeDomain, clearDomains }),
    [domains, mergeNewDomains, removeDomain, clearDomains],
  );
};

const useDomainFilter = (): DomainFilter => {
  const { query, replace, pathname } = useRouter();
  const state = useMemo(() => {
    if (typeof query?.domains === 'string') {
      return [query.domains];
    }
    if (
      Array.isArray(query?.domains) &&
      query.domains.every(domain => typeof domain === 'string')
    ) {
      return query.domains;
    }
    return undefined;
  }, [query]);

  const toggleDomainFilterItem = useCallback(
    (filterItem: string) => {
      replace(
        {
          pathname,
          query: omitBy(
            {
              ...query,
              domains: xor([...(state || [])], [filterItem]),
            },
            isNil,
          ),
        },
        undefined,
        { shallow: true },
      );
    },
    [pathname, query, replace, state],
  );

  const clearDomainFilter = useCallback(() => {
    replace(
      {
        pathname,
        query: omitBy(
          {
            ...query,
            domains: null,
          },
          isNil,
        ),
      },
      undefined,
      { shallow: true },
    );
  }, [pathname, query, replace]);

  const domainsCache = useDomainsCache();

  const domainFilter = useMemo(
    () => ({
      state,
      domainsCache,
      toggleDomainFilterItem,
      clearDomainFilter,
    }),
    [clearDomainFilter, domainsCache, state, toggleDomainFilterItem],
  );

  return domainFilter;
};

export default useDomainFilter;
