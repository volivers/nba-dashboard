import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { PLAYERS_API_URL, PlayerResponseEntity, PlayerService, deserializePlayerResponse } from './PlayerService';
import { Params, serializeParams } from '../interfaces/Params';
import { mockedPaginationEntity } from '../entities/PaginationEntity';
import { mockedPlayerEntity } from '../entities/PlayerEntity';

const axiosMock = new AxiosMockAdapter(axios);

describe('PlayerService', () => {
  let mockedPlayerResponse: PlayerResponseEntity;
  let params: Params;

  beforeEach(() => {
    mockedPlayerResponse = {
      data: [mockedPlayerEntity],
      meta: mockedPaginationEntity,
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('when the request succeeds', () => {
    beforeEach(() => {
      axiosMock.onGet(PLAYERS_API_URL).reply(200, mockedPlayerResponse);
    });

    it('returns a deserialized response', async () => {
      const response = await PlayerService.getAll();

      expect(response).toEqual(deserializePlayerResponse(mockedPlayerResponse));
    });
  });

  describe('when the request fails', () => {
    beforeEach(() => {
      axiosMock.onGet(PLAYERS_API_URL).networkError();
    });

    it('handles the API error', async () => {
      await expect(PlayerService.getAll()).rejects.toThrow('Network Error');
    });
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { page: 5, perPage: 60 };

      mockedPlayerResponse = {
        ...mockedPlayerResponse,
        meta: {
          current_page: 5,
          next_page: 6,
          per_page: 60,
        },
      };

      axiosMock.onGet(PLAYERS_API_URL, { params: serializeParams(params) }).reply(200, mockedPlayerResponse);
    });

    it('calls the API with the correct params', async () => {
      await PlayerService.getAll(params);

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
