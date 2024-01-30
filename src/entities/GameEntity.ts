import { Game } from '../interfaces/Game';
import { TeamEntity, deserializeTeamEntity, mockedAwayTeamEntity, mockedHomeTeamEntity } from './TeamEntity';

export interface GameEntity {
  date: string;
  home_team: TeamEntity;
  home_team_score: number;
  id: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: TeamEntity;
  visitor_team_score: number;
}

export const deserializeGameEntity = (entity: GameEntity): Game => ({
  date: entity.date,
  homeTeam: deserializeTeamEntity(entity.home_team),
  homeTeamScore: entity.home_team_score,
  id: entity.id,
  period: entity.period,
  postseason: entity.postseason,
  season: entity.season,
  status: entity.status,
  time: entity.time,
  visitorTeam: deserializeTeamEntity(entity.visitor_team),
  visitorTeamScore: entity.visitor_team_score,
});

export const mockedGameEntity: GameEntity = {
  date: '2000-11-01T00:00:00.000Z',
  home_team: mockedHomeTeamEntity,
  home_team_score: 100,
  id: 1,
  period: 4,
  postseason: true,
  season: 1,
  status: 'Final',
  time: '',
  visitor_team: mockedAwayTeamEntity,
  visitor_team_score: 80,
};
