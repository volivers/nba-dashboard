import React, { useState } from 'react';
import { useStats } from '../../hooks/useStats';
import PaginatedTable from '../Table/PaginatedTable';
import { Player } from '../../interfaces/Player';
import { formatDate } from '../../utils/formatDate';

export interface StatsProps {
  activeGameId?: number;
  description: string;
  selectedPlayer?: Player;
  title: string;
}

const Stats = ({ activeGameId, description, selectedPlayer, title }: StatsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: results, isLoading } = useStats({
    ...selectedPlayer && { playerIds: [selectedPlayer.id] },
    ...activeGameId && { gameIds: [activeGameId] },
    page: currentPage,
    perPage: 10,
  });

  if (isLoading) return <p>Loading stats...</p>;

  return (
    <PaginatedTable
      description={description}
      isLastPage={!results?.meta.nextPage || results?.meta.nextPage === results?.meta.currentPage}
      onPageChange={setCurrentPage}
      page={currentPage}
      title={title}
    >
      <thead>
        <tr>
          <th />
          <th>Ast</th>
          <th>Blk</th>
          <th>Pts</th>
          <th>Reb</th>
          <th>Stl</th>
          <th>Turnover</th>
          <th>Min</th>
        </tr>
      </thead>
      <tbody>
        {results?.data.map(({ ast, blk, game, id, min, player, pts, reb, stl, turnover }) => (
          min && (
            <tr key={id}>
              <td className="text-nowrap">
                {activeGameId ? `${player.firstName} ${player.lastName}` : formatDate(game.date)}
              </td>
              <td>{ast}</td>
              <td>{blk}</td>
              <td>{pts}</td>
              <td>{reb}</td>
              <td>{stl}</td>
              <td>{turnover}</td>
              <td>{min}</td>
            </tr>
          )
        ))}
      </tbody>
    </PaginatedTable >
  );
};

export default Stats;
