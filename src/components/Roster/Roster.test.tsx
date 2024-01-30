import { render, screen } from '@testing-library/react';
import Roster, { RosterProps } from './Roster';
import { deserializePaginationEntity, mockedPaginationEntity } from '../../entities/PaginationEntity';
import { useInfinitePlayers } from '../../hooks/useInfinitePlayers';
import { deserializePlayerEntity, mockedPlayerEntity } from '../../entities/PlayerEntity';

jest.mock('../../hooks/useInfinitePlayers');
const mockedUseInfinitePlayers = useInfinitePlayers as jest.Mock;

describe('Roster', () => {
  let props: RosterProps;

  beforeEach(() => {
    props = {
      activeTeamId: 2,
      onSelectPlayer: jest.fn(),
    };

    mockedUseInfinitePlayers.mockResolvedValue({
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      pages: [
        {
          data: [deserializePlayerEntity(mockedPlayerEntity)],
          meta: deserializePaginationEntity(mockedPaginationEntity),
        }
      ],
    });
  });

  it('renders properly', () => {
    const { container } = render(<Roster {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when there is a selected player', () => {
    beforeEach(() => {
      props = {
        ...props,
        selectedPlayer: deserializePlayerEntity(mockedPlayerEntity),
      };
    });

    it('renders the player name', () => {
      render(<Roster {...props} />);

      expect(screen.getByText(/Neemias Queta/)).toBeInTheDocument();
    });
  });
});
