import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { useRouter } from 'next/router';
import stringSimilarity from 'string-similarity';
import { UrlObject } from 'url';

export type Search = {
  state?: string;
  setSearch: (value?: string) => void;
  getSearchUrl: (value?: string) => UrlObject;
};

const useSearch = (): Search => {
  const { query, replace, pathname } = useRouter();
  const searchString = typeof query?.q === 'string' ? query.q : undefined;
  const [inertSearchString, setInertSearchString] = useState(searchString);
  const debounceSearchString = useMemo(
    () => debounce(setInertSearchString, 1500),
    [],
  );
  useEffect(() => {
    /**
     *
     * UX optimization
     *
     * This effect prevents too many api calls while typing.
     * Simple debounce causes delay while toggling topics menu.
     * To prevent the delay we track similarity between old and new value.
     * If they are similar we debounce input, if not we immediately update the value
     *
     */
    if (searchString !== inertSearchString) {
      if (searchString && inertSearchString) {
        if (
          searchString.length < 8 ||
          stringSimilarity.compareTwoStrings(searchString, inertSearchString) >
            0.3
        ) {
          debounceSearchString(searchString);
        } else {
          setInertSearchString(searchString);
        }
      } else {
        debounceSearchString(searchString);
      }
    }
  }, [inertSearchString, debounceSearchString, searchString]);

  const getSearchUrl = useCallback(
    (value?: string): UrlObject => ({
      pathname,
      query: omitBy(
        {
          ...query,
          q: value?.trim() || undefined,
        },
        isNil,
      ),
    }),
    [pathname, query],
  );

  const setSearch = useCallback(
    (value?: string) => {
      replace(getSearchUrl(value), undefined, { shallow: true });
    },
    [getSearchUrl, replace],
  );

  return {
    state: inertSearchString ?? searchString, // This makes initial load more smoothly
    setSearch,
    getSearchUrl,
  };
};

export default useSearch;
