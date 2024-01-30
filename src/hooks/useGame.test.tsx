import { renderHook, waitFor } from '@testing-library/react';
import { useGame } from './useGame';
import { GameResponse, GameService } from '../services/GameService';
import { deserializePaginationEntity, mockedPaginationEntity } from '../entities/PaginationEntity';
import { QueryClient, QueryClientProvider } from 'react-query';
import { deserializeGameEntity, mockedGameEntity } from '../entities/GameEntity';
import { Params } from '../interfaces/Params';

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useGame', () => {
  let mockedGameResponse: GameResponse;
  let params: Params;

  beforeEach(() => {
    mockedGameResponse = {
      data: [deserializeGameEntity(mockedGameEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    jest.spyOn(GameService, 'getAll').mockResolvedValue(mockedGameResponse);
  });

  it('returns the games response', async () => {
    const { result } = renderHook(() => useGame(), { wrapper: QueryWrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockedGameResponse));
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { teamIds: [4] };
    });

    it('calls GameService.getAll with the correct params', async () => {
      renderHook(() => useGame(params), { wrapper: QueryWrapper });

      await waitFor(() => expect(GameService.getAll).toHaveBeenCalledWith(params));
    });
  });
});
