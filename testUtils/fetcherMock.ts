import { Data as ArticlesData } from '@api/useNewsList';

// TODO: mock api calls
const fetcherMock = (url: string): ArticlesData | null => {
  switch (url) {
    case 'https://newsapi.org/v2/everything?pageSize=5&page=1&q=Economics':
      return null;
    default:
      return null;
  }
};

export default fetcherMock;
