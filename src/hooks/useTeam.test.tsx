import { renderHook, waitFor } from '@testing-library/react';
import { useTeam } from './useTeam';
import { TeamResponse, TeamService } from '../services/TeamService';
import { deserializeTeamEntity, mockedHomeTeamEntity } from '../entities/TeamEntity';
import { deserializePaginationEntity, mockedPaginationEntity } from '../entities/PaginationEntity';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTeam', () => {
  let mockedTeamResponse: TeamResponse;

  beforeEach(() => {
    mockedTeamResponse = {
      data: [deserializeTeamEntity(mockedHomeTeamEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    jest.spyOn(TeamService, 'getAll').mockResolvedValue(mockedTeamResponse);
  });

  it('returns the teams response', async () => {
    const { result } = renderHook(() => useTeam(), { wrapper: QueryWrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockedTeamResponse));
  });
});
