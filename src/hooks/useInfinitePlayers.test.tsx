import { renderHook, waitFor } from '@testing-library/react';
import { useInfinitePlayers } from './useInfinitePlayers';
import { PlayerResponse, PlayerService } from '../services/PlayerService';
import { deserializePaginationEntity, mockedPaginationEntity } from '../entities/PaginationEntity';
import { QueryClient, QueryClientProvider } from 'react-query';
import { deserializePlayerEntity, mockedPlayerEntity } from '../entities/PlayerEntity';
import { mockedAwayTeamEntity } from '../entities/TeamEntity';

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useInfinitePlayers', () => {
  let mockedPlayerResponse: PlayerResponse;

  beforeEach(() => {
    mockedPlayerResponse = {
      data: [deserializePlayerEntity(mockedPlayerEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    jest.spyOn(PlayerService, 'getAll').mockResolvedValue(mockedPlayerResponse);
  });

  it('returns the first page of players', async () => {
    const { result } = renderHook(() => useInfinitePlayers(), { wrapper: QueryWrapper });

    await waitFor(() => expect(result?.current?.data?.pages).toHaveLength(1));

    await waitFor(() => expect(result?.current?.data?.pages[0]).toEqual(mockedPlayerResponse));
  });

  describe('when there are multiple pages available', () => {
    const mockedNextPlayerResponse = {
      data: [deserializePlayerEntity({
        first_name: 'Michael',
        id: 23,
        last_name: 'Jordan',
        position: 'SG',
        team: mockedAwayTeamEntity,
      })],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    beforeEach(() => {
      jest.spyOn(PlayerService, 'getAll')
        .mockResolvedValueOnce(mockedPlayerResponse)
        .mockResolvedValueOnce(mockedNextPlayerResponse);
    });

    it('returns the next page of players', async () => {
      const { result } = renderHook(() => useInfinitePlayers(), { wrapper: QueryWrapper });

      result.current.fetchNextPage();

      await waitFor(() => expect(result?.current?.data?.pages).toHaveLength(2));

      await waitFor(() => expect(result?.current?.data?.pages[1]).toEqual(mockedNextPlayerResponse));
    });
  });
});
