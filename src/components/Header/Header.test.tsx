import { render } from '@testing-library/react';
import Header, { HeaderProps } from './Header';
import { deserializePaginationEntity, mockedPaginationEntity } from '../../entities/PaginationEntity';
import { TeamResponse } from '../../services/TeamService';
import { useTeam } from '../../hooks/useTeam';
import { deserializeTeamEntity, mockedHomeTeamEntity } from '../../entities/TeamEntity';

jest.mock('../../hooks/useTeam');
const mockedUseTeam = useTeam as jest.Mock;

describe('Header', () => {
  let props: HeaderProps;
  let mockedTeamResponse: TeamResponse;

  beforeEach(() => {
    props = {
      activeTeamId: 2,
      onTeamChange: jest.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    mockedTeamResponse = {
      data: [deserializeTeamEntity(mockedHomeTeamEntity)],
      meta: deserializePaginationEntity(mockedPaginationEntity),
    };

    mockedUseTeam.mockResolvedValue({
      ...mockedTeamResponse,
      isLoading: false,
    });
  });

  it('renders properly', () => {
    const { container } = render(<Header {...props} />);

    expect(container).toMatchSnapshot();
  });
});
