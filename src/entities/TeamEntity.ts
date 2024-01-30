import { Team } from '../interfaces/Team';

export interface TeamEntity {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: number;
  name: string;
}

export const deserializeTeamEntity = (entity: TeamEntity): Team => ({
  abbreviation: entity?.abbreviation,
  city: entity?.city,
  conference: entity?.conference,
  division: entity?.division,
  fullName: entity?.full_name,
  id: entity?.id,
  name: entity?.name,
});

export const mockedHomeTeamEntity: TeamEntity = {
  abbreviation: 'BOS',
  city: 'Boston',
  conference: 'Conference',
  division: 'Division',
  full_name: 'Boston Celtics',
  id: 2,
  name: 'Celtics',
};

export const mockedAwayTeamEntity: TeamEntity = {
  abbreviation: 'LAC',
  city: 'Los Angeles',
  conference: 'Conference',
  division: 'Division',
  full_name: 'LA Clippers',
  id: 1,
  name: 'Clippers',
};