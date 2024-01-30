import axios from 'axios';
import { PaginationEntity, deserializePaginationEntity } from '../entities/PaginationEntity';
import { Pagination } from '../interfaces/Pagination';
import { Params, serializeParams } from '../interfaces/Params';
import { GameEntity, deserializeGameEntity } from '../entities/GameEntity';
import { Game } from '../interfaces/Game';

export interface GameResponse {
  data: Game[];
  meta: Pagination;
}

export interface GameResponseEntity {
  data: GameEntity[];
  meta: PaginationEntity;
}

export const deserializeGameResponse = (entity: GameResponseEntity): GameResponse => ({
  data: entity.data.map(deserializeGameEntity),
  meta: deserializePaginationEntity(entity.meta)
});

export const GAMES_API_URL = process.env.REACT_APP_API_URL + '/games';

export class GameService {
  public static async getAll(params?: Params): Promise<GameResponse> {
    const response = await axios<GameResponseEntity>({
      method: 'GET',
      url: GAMES_API_URL,
      params: { ...serializeParams(params) },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });

    return deserializeGameResponse(response.data);
  };
};
