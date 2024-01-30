import axios from 'axios';
import { PaginationEntity, deserializePaginationEntity } from '../entities/PaginationEntity';
import { Pagination } from '../interfaces/Pagination';
import { Params, serializeParams } from '../interfaces/Params';
import { StatsEntity, deserializeStatsEntity } from '../entities/StatsEntity';
import { Stats } from '../interfaces/Stats';

export interface StatsResponse {
  data: Stats[];
  meta: Pagination;
}

export interface StatsResponseEntity {
  data: StatsEntity[];
  meta: PaginationEntity;
}

export const deserializeStatsResponse = (entity: StatsResponseEntity): StatsResponse => ({
  data: entity.data.map(deserializeStatsEntity),
  meta: deserializePaginationEntity(entity.meta)
});

export const STATS_API_URL = process.env.REACT_APP_API_URL + '/stats';

export class StatsService {
  public static async getAll(params?: Params): Promise<StatsResponse> {
    const response = await axios<StatsResponseEntity>({
      method: 'GET',
      url: STATS_API_URL,
      params: { ...serializeParams(params) },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });

    return deserializeStatsResponse(response.data);
  };
};
