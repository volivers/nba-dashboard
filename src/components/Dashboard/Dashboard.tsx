import React from 'react';
import Roster from '../Roster/Roster';
import Games from '../Games/Games';
import Stats from '../Stats/Stats';
import { Player } from '../../interfaces/Player';

export interface DashboardProps {
  activeGameId?: number;
  activeTeamId: number;
  onClickGame: (game: number) => void;
  onSelectPlayer: (player: Player) => void;
  selectedPlayer?: Player;
}

const Dashboard = ({
  activeGameId,
  activeTeamId,
  onClickGame,
  onSelectPlayer,
  selectedPlayer
}: DashboardProps) => (
  <section className="m-4 d-flex justify-content-center flex-wrap">
    <div className="w-50">
      <Games activeGameId={activeGameId} activeTeamId={activeTeamId} onClickGame={onClickGame} />
      {activeGameId && <Stats activeGameId={activeGameId} description="All stats available for this game." title="Game Stats" />}
    </div>
    <div className="vr mx-5 min-vh-100" />
    <div className="w-40">
      <Roster activeTeamId={activeTeamId} onSelectPlayer={onSelectPlayer} selectedPlayer={selectedPlayer} />
      {selectedPlayer && <Stats selectedPlayer={selectedPlayer} description="All stats available for this player." title="Player Stats" />}
    </div>
  </section>
);

export default Dashboard;