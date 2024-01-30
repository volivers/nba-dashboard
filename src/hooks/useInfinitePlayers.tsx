import { useInfiniteQuery } from 'react-query';
import { PlayerService } from '../services/PlayerService';

export const useInfinitePlayers = (teamId?: number) => useInfiniteQuery(
  ['players', teamId],
  ({ pageParam = 1 }) => PlayerService.getAll({ page: pageParam, perPage: 100 }),
  {
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.nextPage) return undefined;
      return lastPage.meta.currentPage + 1;
    },
  },
);
