import { Team } from "./Team";

export interface Player {
  firstName: string;
  heightFeet?: number;
  heightInches?: number;
  id: number;
  lastName: string;
  position: string;
  team: Team;
  weightPounds?: number;
}
