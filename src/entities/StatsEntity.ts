import { Stats } from '../interfaces/Stats';
import { GameEntity, deserializeGameEntity, mockedGameEntity } from './GameEntity';
import { PlayerEntity, deserializePlayerEntity, mockedPlayerEntity } from './PlayerEntity';
import { TeamEntity, deserializeTeamEntity, mockedHomeTeamEntity } from './TeamEntity';

export interface StatsEntity {
  ast: number;
  blk: number;
  dreb: number;
  fg3_pct: number;
  fg3a: number;
  fg3m: number;
  fg_pct: number;
  fga: number;
  fgm: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  game: GameEntity;
  id: number;
  min: string;
  oreb: number;
  pf: number;
  player: PlayerEntity;
  pts: number;
  reb: number;
  stl: number;
  team: TeamEntity;
  turnover: number;
}

export const deserializeStatsEntity = (entity: StatsEntity): Stats => ({
  ast: entity.ast,
  blk: entity.blk,
  dreb: entity.dreb,
  fg3Pct: entity.fg3_pct,
  fg3a: entity.fg3a,
  fg3m: entity.fg3m,
  fgPct: entity.fg_pct,
  fga: entity.fga,
  fgm: entity.fgm,
  ftPct: entity.ft_pct,
  fta: entity.fta,
  ftm: entity.ftm,
  game: deserializeGameEntity(entity.game),
  id: entity.id,
  min: entity.min,
  oreb: entity.oreb,
  pf: entity.pf,
  player: deserializePlayerEntity(entity.player),
  pts: entity.pts,
  reb: entity.reb,
  stl: entity.stl,
  team: deserializeTeamEntity(entity.team),
  turnover: entity.turnover,
});

export const mockedStatsEntity: StatsEntity = {
  ast: 10,
  blk: 4,
  dreb: 15,
  fg3_pct: 1,
  fg3a: 10,
  fg3m: 10,
  fg_pct: 10,
  fga: 10,
  fgm: 10,
  ft_pct: 10,
  fta: 10,
  ftm: 10,
  game: mockedGameEntity,
  id: 1,
  min: '18',
  oreb: 5,
  pf: 14,
  player: mockedPlayerEntity,
  pts: 20,
  reb: 10,
  stl: 5,
  team: mockedHomeTeamEntity,
  turnover: 10,
};
