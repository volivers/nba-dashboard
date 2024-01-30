import { useQuery } from 'react-query';
import { GameService } from '../services/GameService';
import { Params } from '../interfaces/Params';

export const useGame = (params?: Params) => {
  return useQuery(['games', params], () => GameService.getAll(params), {
    keepPreviousData: true
  });
};
