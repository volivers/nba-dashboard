import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { TEAMS_API_URL, TeamResponseEntity, TeamService, deserializeTeamResponse } from './TeamService';
import { Params, serializeParams } from '../interfaces/Params';
import { mockedPaginationEntity } from '../entities/PaginationEntity';
import { mockedHomeTeamEntity } from '../entities/TeamEntity';

const axiosMock = new AxiosMockAdapter(axios);

describe('TeamService', () => {
  let mockedTeamResponse: TeamResponseEntity;
  let params: Params;

  beforeEach(() => {
    mockedTeamResponse = {
      data: [mockedHomeTeamEntity],
      meta: mockedPaginationEntity,
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('when the request succeeds', () => {
    beforeEach(() => {
      axiosMock.onGet(TEAMS_API_URL).reply(200, mockedTeamResponse);
    });

    it('returns a deserialized response', async () => {
      const response = await TeamService.getAll();

      expect(response).toEqual(deserializeTeamResponse(mockedTeamResponse));
    });
  });

  describe('when the request fails', () => {
    beforeEach(() => {
      axiosMock.onGet(TEAMS_API_URL).networkError();
    });

    it('handles the API error', async () => {
      await expect(TeamService.getAll()).rejects.toThrow('Network Error');
    });
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { page: 5, perPage: 60 };

      mockedTeamResponse = {
        ...mockedTeamResponse,
        meta: {
          current_page: 5,
          next_page: 6,
          per_page: 60,
        },
      };

      axiosMock.onGet(TEAMS_API_URL, { params: serializeParams(params) }).reply(200, mockedTeamResponse);
    });

    it('calls the API with the correct params', async () => {
      await TeamService.getAll(params);

      expect(axiosMock.history.get[0].params).toEqual({
        game_ids: undefined,
        page: 5,
        per_page: 60,
        player_ids: undefined,
        team_ids: undefined,
      });;
    });
  });
});
