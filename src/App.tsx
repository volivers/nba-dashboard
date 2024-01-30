import React, { useState } from 'react';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import { Player } from './interfaces/Player';

const App = () => {
  const [activeTeamId, setActiveTeamId] = useState<number>(2);
  const [activeGameId, setActiveGameId] = useState<number | undefined>(undefined);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);

  const handleTeamChange = (id: number) => {
    setActiveTeamId(id);
    setActiveGameId(undefined);
    setSelectedPlayer(undefined);
  };

  return (
    <main>
      <Header activeTeamId={activeTeamId} onTeamChange={handleTeamChange} />
      <Dashboard
        activeGameId={activeGameId}
        activeTeamId={activeTeamId}
        onClickGame={setActiveGameId}
        onSelectPlayer={setSelectedPlayer}
        selectedPlayer={selectedPlayer}
      />
    </main>
  );
}

export default App;
