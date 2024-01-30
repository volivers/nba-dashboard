import { useQuery } from 'react-query';
import { Params } from '../interfaces/Params';
import { StatsService } from '../services/StatsService';

export const useStats = (params?: Params) => {
  return useQuery(['stats', params], () => StatsService.getAll(params), {
    keepPreviousData: true
  });
};
