import React, { useMemo } from 'react';
import { useInfinitePlayers } from '../../hooks/useInfinitePlayers';
import { Dropdown } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import { Player } from '../../interfaces/Player';

export interface RosterProps {
  activeTeamId: number;
  onSelectPlayer: (player: Player) => void;
  selectedPlayer?: Player;
}

const Roster = ({ activeTeamId, onSelectPlayer, selectedPlayer }: RosterProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePlayers(activeTeamId);
  const { firstName, lastName } = selectedPlayer || {};

  const teamPlayers = useMemo(() => {
    return data?.pages
      .flatMap(page => page.data)
      .filter(({ team }) => team.id === activeTeamId);
  }, [data, activeTeamId]);

  return (
    <div>
      <h1 className="my-3">Team Players</h1>
      <p className="mb-4"><small>Pick a player to view the stats.</small></p>
      <Dropdown className="mb-5">
        <Dropdown.Toggle variant="dark">
          {selectedPlayer ? `${firstName} ${lastName}` : 'Select player'}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage || isFetchingNextPage}
            useWindow={false}
          >
            {teamPlayers?.map((player) => (
              <Dropdown.Item key={player.id} onClick={() => onSelectPlayer(player)}>
                {player.firstName} {player.lastName}
              </Dropdown.Item>
            ))}
            {isFetchingNextPage && <Dropdown.Item>Loading more...</Dropdown.Item>}
          </InfiniteScroll>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Roster;
