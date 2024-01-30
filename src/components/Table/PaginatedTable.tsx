import React from 'react';
import { Pagination, Table } from 'react-bootstrap';

export interface PaginatedTableProps {
  children: React.ReactNode;
  description: string;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
  page: number;
  title: string;
}

const PaginatedTable = ({
  children,
  description,
  isLastPage,
  onPageChange,
  page,
  title,
}: PaginatedTableProps) => (
  <div>
    <h1 className="my-3">{title}</h1>
    <div className="d-flex justify-content-between">
      <p><small>{description}</small></p>
      <Pagination className="mt-3">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        />
        <Pagination.Next
          disabled={isLastPage}
          onClick={() => onPageChange(page + 1)}
        />
      </Pagination>
    </div>
    <Table hover responsive>
      {children}
    </Table>
  </div>
);

export default PaginatedTable;
