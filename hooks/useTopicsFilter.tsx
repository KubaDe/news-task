import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import uniq from 'lodash/uniq';

export type TopicFilter = {
  topicsCache?: ReturnType<typeof useTopicsCache>;
};

const useTopicsCache = () => {
  const [topics, setTopics] = useLocalStorage<string[]>('topics', []);
  const pushNewTopic = useCallback(
    (newTopic?: string) => {
      if (newTopic) {
        const newTopics = uniq([newTopic, ...(topics || [])]).slice(0, 10);
        setTopics(newTopics);
      }
    },
    [topics, setTopics],
  );

  const removeTopic = useCallback(
    (topicToRemove: string) => {
      setTopics(topics?.filter(topic => topic !== topicToRemove));
    },
    [topics, setTopics],
  );
  const clearTopics = useCallback(() => {
    setTopics([]);
  }, [setTopics]);

  return useMemo(
    () => ({ topics, setTopics, pushNewTopic, removeTopic, clearTopics }),
    [topics, setTopics, pushNewTopic, removeTopic, clearTopics],
  );
};

const useTopicFilter = (): TopicFilter => {
  const topicsCache = useTopicsCache();

  const topicFilter = useMemo(
    () => ({
      topicsCache,
    }),
    [topicsCache],
  );

  return topicFilter;
};

export default useTopicFilter;
