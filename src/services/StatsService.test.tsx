import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { STATS_API_URL, StatsResponseEntity, StatsService, deserializeStatsResponse } from './StatsService';
import { Params, serializeParams } from '../interfaces/Params';
import { mockedStatsEntity } from '../entities/StatsEntity';
import { mockedPaginationEntity } from '../entities/PaginationEntity';

const axiosMock = new AxiosMockAdapter(axios);

describe('StatsService', () => {
  let mockedStatsResponse: StatsResponseEntity;
  let params: Params;

  beforeEach(() => {
    mockedStatsResponse = {
      data: [mockedStatsEntity],
      meta: mockedPaginationEntity,
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('when the request succeeds', () => {
    beforeEach(() => {
      axiosMock.onGet(STATS_API_URL).reply(200, mockedStatsResponse);
    });

    it('returns a deserialized response', async () => {
      const response = await StatsService.getAll();

      expect(response).toEqual(deserializeStatsResponse(mockedStatsResponse));
    });
  });

  describe('when the request fails', () => {
    beforeEach(() => {
      axiosMock.onGet(STATS_API_URL).networkError();
    });

    it('handles the API error', async () => {
      await expect(StatsService.getAll()).rejects.toThrow('Network Error');
    });
  });

  describe('when params are provided', () => {
    beforeEach(() => {
      params = { page: 2, playerIds: [88], perPage: 30 };

      mockedStatsResponse = {
        ...mockedStatsResponse,
        meta: {
          current_page: 2,
          next_page: 3,
          per_page: 30,
        },
      };

      axiosMock.onGet(STATS_API_URL, { params: serializeParams(params) }).reply(200, mockedStatsResponse);
    });

    it('calls the API with the correct params', async () => {
      await StatsService.getAll(params);

      expect(axiosMock.history.get[0].params).toEqual({
        game_ids: undefined,
        page: 2,
        per_page: 30,
        player_ids: [88],
        team_ids: undefined,
      });;
    });
  });
});
