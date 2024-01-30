import axios from 'axios';
import { TeamEntity, deserializeTeamEntity } from '../entities/TeamEntity';
import { PaginationEntity, deserializePaginationEntity } from '../entities/PaginationEntity';
import { Team } from '../interfaces/Team';
import { Pagination } from '../interfaces/Pagination';
import { Params, serializeParams } from '../interfaces/Params';

export interface TeamResponse {
  data: Team[];
  meta: Pagination;
}

export interface TeamResponseEntity {
  data: TeamEntity[];
  meta: PaginationEntity;
}

export const deserializeTeamResponse = (entity: TeamResponseEntity): TeamResponse => ({
  data: entity.data.map(deserializeTeamEntity),
  meta: deserializePaginationEntity(entity.meta)
});

export const TEAMS_API_URL = process.env.REACT_APP_API_URL + '/teams'

export class TeamService {
  public static async getAll(params?: Params): Promise<TeamResponse> {
    const response = await axios<TeamResponseEntity>({
      method: 'GET',
      url: TEAMS_API_URL,
      params: { ...serializeParams(params) },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });

    return deserializeTeamResponse(response.data);
  };
};
