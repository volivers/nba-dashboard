import { render, screen } from '@testing-library/react';
import Stats, { StatsProps } from './Stats';
import { useStats } from '../../hooks/useStats';
import { deserializePaginationEntity, mockedPaginationEntity } from '../../entities/PaginationEntity';
import { StatsResponse } from '../../services/StatsService';
import { deserializeStatsEntity, mockedStatsEntity } from '../../entities/StatsEntity';
import { deserializePlayerEntity, mockedPlayerEntity } from '../../entities/PlayerEntity';

jest.mock('../../hooks/useStats');
const mockedUseStats = useStats as jest.Mock;

describe('Stats', () => {
  let props: StatsProps;
  let mockedStatsResponse: StatsResponse;

  beforeEach(() => {
    props = {
      description: 'Lorem ipsum',
      selectedPlayer: deserializePlayerEntity(mockedPlayerEntity),
      title: 'Stats',
    };

    mockedStatsResponse = {
      data: [deserializeStatsEntity(mockedStatsEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    mockedUseStats.mockResolvedValue({
      ...mockedStatsResponse,
      isLoading: false,
    });
  });

  it('renders properly', () => {
    const { container } = render(<Stats {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when Stats are loading', () => {
    beforeEach(() => {
      mockedUseStats.mockReturnValue({
        ...mockedStatsResponse,
        isLoading: true,
      });
    });

    it('renders a loading message', () => {
      render(<Stats {...props} />);

      expect(screen.getByText(/Loading stats.../)).toBeInTheDocument();
    });
  });
});
