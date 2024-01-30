import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import Logo from '../Logo/Logo';
import classNames from 'classnames';
import PaginatedTable from '../Table/PaginatedTable';
import { formatDate } from '../../utils/formatDate';

export interface GamesProps {
  activeGameId?: number;
  activeTeamId: number;
  onClickGame: (game: number) => void;
}

const Games = ({ activeGameId, activeTeamId, onClickGame }: GamesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: results, isLoading } = useGame({ page: currentPage, perPage: 5, teamIds: [activeTeamId] });

  if (isLoading) return <p>Loading team games...</p>;

  return (
    <PaginatedTable
      description="Pick a game to view the stats."
      isLastPage={!results?.meta.nextPage || results?.meta.nextPage === results?.meta.currentPage}
      onPageChange={setCurrentPage}
      page={currentPage}
      title="Team Games"
    >
      <thead>
        <tr>
          <th>Game</th>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results?.data.map(({ date, homeTeam, homeTeamScore, id, visitorTeam, visitorTeamScore }) => (
          <tr
            className={classNames({ 'table-active': activeGameId === id })}
            key={id}
            onClick={() => onClickGame(id)}
            role="button"
          >
            <td className="text-nowrap">
              <Logo name={visitorTeam.abbreviation} />
              <span className={classNames({ 'fw-bold': visitorTeamScore > homeTeamScore })}>
                {visitorTeam.name}
              </span>
              <span className="ms-2">@</span>
              <Logo name={homeTeam.abbreviation} />
              <span className={classNames({ 'fw-bold': homeTeamScore > visitorTeamScore })}>
                {homeTeam.name}
              </span>
            </td>
            <td className="text-nowrap">
              {formatDate(date)}
            </td>
            <td className="text-nowrap">
              {visitorTeamScore}-{homeTeamScore}
            </td>
          </tr>
        ))}
      </tbody>
    </PaginatedTable>
  );
};

export default Games;
