import { render, screen } from '@testing-library/react';
import Dashboard, { DashboardProps } from './Dashboard';
import { deserializePlayerEntity, mockedPlayerEntity } from '../../entities/PlayerEntity';

jest.mock('../Roster/Roster', () => () => <div>Roster</div>);

jest.mock('../Games/Games', () => () => <div>Games</div>);

jest.mock('../Stats/Stats', () => () => <div>Stats</div>);

describe('Dashboard', () => {
  let props: DashboardProps;

  beforeEach(() => {
    props = {
      activeTeamId: 1,
      onClickGame: jest.fn(),
      onSelectPlayer: jest.fn(),
    };
  });

  it('renders the roster', () => {
    render(<Dashboard {...props} />);

    expect(screen.getByText(/Roster/)).toBeInTheDocument();
  });

  it('renders the games', () => {
    render(<Dashboard {...props} />);

    expect(screen.getByText(/Games/)).toBeInTheDocument();
  });

  describe('when there is a selected player', () => {
    beforeEach(() => {
      props = {
        ...props,
        selectedPlayer: deserializePlayerEntity(mockedPlayerEntity),
      };
    });

    it('renders the stats', () => {
      render(<Dashboard {...props} />);

      expect(screen.getByText(/Stats/)).toBeInTheDocument();
    });
  });

  describe('when there is an active game', () => {
    beforeEach(() => {
      props = {
        ...props,
        activeGameId: 1,
      };
    });

    it('renders the stats', () => {
      render(<Dashboard {...props} />);

      expect(screen.getByText(/Stats/)).toBeInTheDocument();
    });
  });
});
