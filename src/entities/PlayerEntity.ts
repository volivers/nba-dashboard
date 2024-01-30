import { Player } from '../interfaces/Player';
import { TeamEntity, deserializeTeamEntity, mockedHomeTeamEntity } from './TeamEntity';

export interface PlayerEntity {
  first_name: string;
  height_feet?: number;
  height_inches?: number;
  id: number;
  last_name: string;
  position: string;
  team: TeamEntity;
  weight_pounds?: number;
}

export const deserializePlayerEntity = (entity: PlayerEntity): Player => ({
  firstName: entity.first_name,
  heightFeet: entity?.height_feet,
  heightInches: entity?.height_inches,
  id: entity.id,
  lastName: entity.last_name,
  position: entity.position,
  team: deserializeTeamEntity(entity.team),
  weightPounds: entity?.weight_pounds,
});

export const mockedPlayerEntity: PlayerEntity = {
  first_name: 'Neemias',
  id: 88,
  last_name: 'Queta',
  position: 'C',
  team: mockedHomeTeamEntity,
};
