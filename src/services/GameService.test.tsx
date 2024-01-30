import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { GAMES_API_URL, GameResponseEntity, GameService, deserializeGameResponse } from './GameService';
import { Params, serializeParams } from '../interfaces/Params';
import { mockedPaginationEntity } from '../entities/PaginationEntity';
import { mockedGameEntity } from '../entities/GameEntity';

const axiosMock = new AxiosMockAdapter(axios);

describe('GameService', () => {
  let mockedGameResponse: GameResponseEntity;
  let params: Params;

  beforeEach(() => {
    mockedGameResponse = {
      data: [mockedGameEntity],
      meta: mockedPaginationEntity,
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('when the request succeeds', () => {
    beforeEach(() => {
      axiosMock.onGet(GAMES_API_URL).reply(200, mockedGameResponse);
    });

    it('returns a deserialized response', async () => {
      const response = await GameService.getAll();

      expect(response).toEqual(deserializeGameResponse(mockedGameResponse));
    });
  });

  describe('when the request fails', () => {
    beforeEach(() => {
      axiosMock.onGet(GAMES_API_URL).networkError();
    });

    it('handles the API error', async () => {
      await expect(GameService.getAll()).rejects.toThrow('Network Error');
    });
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { page: 5, perPage: 60 };

      mockedGameResponse = {
        ...mockedGameResponse,
        meta: {
          current_page: 5,
          next_page: 6,
          per_page: 60,
        },
      };

      axiosMock.onGet(GAMES_API_URL, { params: serializeParams(params) }).reply(200, mockedGameResponse);
    });

    it('calls the API with the correct params', async () => {
      await GameService.getAll(params);

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
