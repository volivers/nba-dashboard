import { Game } from "./Game";
import { Player } from "./Player";
import { Team } from "./Team";

export interface Stats {
  ast: number;
  blk: number;
  dreb: number;
  fg3Pct: number;
  fg3a: number;
  fg3m: number;
  fgPct: number;
  fga: number;
  fgm: number;
  ftPct: number;
  fta: number;
  ftm: number;
  game: Game;
  id: number;
  min: string;
  oreb: number;
  pf: number;
  player: Player;
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}
