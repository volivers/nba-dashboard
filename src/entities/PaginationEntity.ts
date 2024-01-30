import { Pagination } from '../interfaces/Pagination';

export interface PaginationEntity {
  current_page: number;
  next_page: number;
  per_page: number;
}

export const deserializePaginationEntity = (entity: PaginationEntity): Pagination => ({
  currentPage: entity.current_page,
  nextPage: entity.next_page,
  perPage: entity.per_page,
});

export const mockedPaginationEntity: PaginationEntity = {
  current_page: 1,
  next_page: 2,
  per_page: 25,
};
