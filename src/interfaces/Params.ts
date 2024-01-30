import { ParamsEntity } from "../entities/ParamsEntity";

export interface Params {
  page?: number;
  perPage?: number;
  gameIds?: number[];
  playerIds?: number[];
  teamIds?: number[];
}

export const serializeParams = (params?: Params): ParamsEntity => ({
  page: params?.page,
  per_page: params?.perPage,
  game_ids: params?.gameIds,
  player_ids: params?.playerIds,
  team_ids: params?.teamIds,
});
