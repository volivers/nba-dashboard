import axios from 'axios';
import { PaginationEntity, deserializePaginationEntity } from '../entities/PaginationEntity';
import { Pagination } from '../interfaces/Pagination';
import { PlayerEntity, deserializePlayerEntity } from '../entities/PlayerEntity';
import { Player } from '../interfaces/Player';
import { Params, serializeParams } from '../interfaces/Params';

export interface PlayerResponse {
  data: Player[];
  meta: Pagination;
}

export interface PlayerResponseEntity {
  data: PlayerEntity[];
  meta: PaginationEntity;
}

export const deserializePlayerResponse = (entity: PlayerResponseEntity): PlayerResponse => ({
  data: entity.data.map(deserializePlayerEntity),
  meta: deserializePaginationEntity(entity.meta)
});

export const PLAYERS_API_URL = process.env.REACT_APP_API_URL + '/players';

export class PlayerService {
  public static async getAll(params?: Params): Promise<PlayerResponse> {
    const response = await axios<PlayerResponseEntity>({
      method: 'GET',
      url: PLAYERS_API_URL,
      params: { ...serializeParams(params) },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });

    return deserializePlayerResponse(response.data);
  };
};
