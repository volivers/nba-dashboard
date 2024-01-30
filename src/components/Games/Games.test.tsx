import { render, screen } from '@testing-library/react';
import Games, { GamesProps } from './Games';
import { useGame } from '../../hooks/useGame';
import { deserializeGameEntity, mockedGameEntity } from '../../entities/GameEntity';
import { deserializePaginationEntity, mockedPaginationEntity } from '../../entities/PaginationEntity';
import { GameResponse } from '../../services/GameService';

jest.mock('../../hooks/useGame');
const mockedUseGame = useGame as jest.Mock;

describe('Games', () => {
  let props: GamesProps;
  let mockedGameResponse: GameResponse;

  beforeEach(() => {
    props = {
      activeTeamId: 2,
      onClickGame: jest.fn(),
    };

    mockedGameResponse = {
      data: [deserializeGameEntity(mockedGameEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    mockedUseGame.mockResolvedValue({
      ...mockedGameResponse,
      isLoading: false,
    });
  });

  it('renders properly', () => {
    const { container } = render(<Games {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when games are loading', () => {
    beforeEach(() => {
      mockedUseGame.mockReturnValue({
        ...mockedGameResponse,
        isLoading: true,
      });
    });

    it('renders a loading message', () => {
      render(<Games {...props} />);

      expect(screen.getByText(/Loading team games.../)).toBeInTheDocument();
    });
  });
});
