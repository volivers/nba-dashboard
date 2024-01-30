import { renderHook, waitFor } from '@testing-library/react';
import { useStats } from './useStats';
import { StatsResponse, StatsService } from '../services/StatsService';
import { deserializePaginationEntity, mockedPaginationEntity } from '../entities/PaginationEntity';
import { QueryClient, QueryClientProvider } from 'react-query';
import { deserializeStatsEntity, mockedStatsEntity } from '../entities/StatsEntity';
import { Params } from '../interfaces/Params';

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useStats', () => {
  let mockedStatsResponse: StatsResponse;
  let params: Params;

  beforeEach(() => {
    mockedStatsResponse = {
      data: [deserializeStatsEntity(mockedStatsEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    jest.spyOn(StatsService, 'getAll').mockResolvedValue(mockedStatsResponse);
  });

  it('returns the stats response', async () => {
    const { result } = renderHook(() => useStats(), { wrapper: QueryWrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockedStatsResponse));
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { playerIds: [2] };
    });

    it('calls StatsService.getAll with the correct params', async () => {
      renderHook(() => useStats(params), { wrapper: QueryWrapper });

      await waitFor(() => expect(StatsService.getAll).toHaveBeenCalledWith(params));
    });
  });
});
