import { Team } from "./Team";

export interface Game {
  date: string;
  homeTeam: Team;
  homeTeamScore: number;
  id: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitorTeam: Team;
  visitorTeamScore: number;
}
