import { useMemo } from 'react';
import uniq from 'lodash/uniq';
import useSWRInfinite from 'swr/infinite';

export type Data = {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
};

export type ApiError = {
  message?: string;
  cause?: {
    message?: string;
  };
};

const PER_PAGE = 5;

const getArticles = (data?: Data[]) =>
  data?.map(chunk => chunk.articles).flat() || [];
const getDomains = (articles: Data['articles']) =>
  uniq(
    articles.map(article => {
      return new URL(article.url).hostname.replace('www.', '');
    }),
  ).sort() || [];

const useNewsList = (
  { q, domains }: { q?: string; domains?: string[] },
  options?: {
    onNewData?: (props: { domains: string[]; q?: string }) => void;
  },
) => {
  const { data, error, isLoading, isValidating, setSize, size } =
    useSWRInfinite<Data, ApiError>(
      (page, previousPageData) => {
        if (previousPageData && !previousPageData.articles.length) {
          return null;
        }
        const searchParams = new URLSearchParams({
          pageSize: `${PER_PAGE}`,
          page: `${page + 1}`,
          q: q ?? '',
          ...(domains ? { domains: domains.join(', ') } : {}),
          language: 'en',
          apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
        });

        return q
          ? `https://newsapi.org/v2/everything?${searchParams.toString()}`
          : null;
      },
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateFirstPage: false,
        onSuccess: (data: Data[]) => {
          const articles = getArticles(data);
          const domains = getDomains(articles);
          options?.onNewData?.({ domains, q });
        },
      },
    );
  const results = useMemo(() => {
    const articles = getArticles(data);

    return {
      articles: getArticles(data),
      domains: getDomains(articles),
      hasMore: (data?.[data?.length - 1].totalResults ?? 0) > articles.length,
      isLoading,
      isValidating,
      error,
      setSize,
      size,
    };
  }, [data, error, isLoading, isValidating, setSize, size]);
  return results;
};

export default useNewsList;
