import { render, screen } from '@testing-library/react';
import PaginatedTable, { PaginatedTableProps } from './PaginatedTable';

describe('PaginatedTable', () => {
  let props: PaginatedTableProps;

  beforeEach(() => {
    props = {
      children: (<div>Component</div>),
      description: 'Lorem ipsum',
      isLastPage: false,
      onPageChange: jest.fn(),
      page: 1,
      title: 'Title',
    };
  });

  it('renders properly', () => {
    const { container } = render(<PaginatedTable {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when the first page is provided', () => {
    beforeEach(() => {
      props = {
        ...props,
        page: 1,
      };
    });

    it('disables the previous button', () => {
      render(<PaginatedTable {...props} />);

      expect(screen.getAllByRole('listitem')[0]).toHaveClass('disabled');
    });
  });

  describe('when the last page is provided', () => {
    beforeEach(() => {
      props = {
        ...props,
        isLastPage: true,
      };
    });

    it('disables the next button', () => {
      render(<PaginatedTable {...props} />);

      expect(screen.getAllByRole('listitem')[1]).toHaveClass('disabled');
    });
  });
});
